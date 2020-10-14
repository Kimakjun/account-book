import { getData } from "../util/api";
import { MONEY_SELECT_BOX_CLICK, TRAN_HISTORY_CLICK } from "../util/event";
import { $el } from "../util/dom";
import Observable from "./Observable";

class TranHistoryModel extends Observable {
  constructor({ state }) {
    super();
    this.month = this.getMonth();
    this.state = state;
    this.trans;
    this.slectType = state.getState("selectType");
    this.init();
  }

  getYear() {
    return new Date().getFullYear();
  }
  getMonth() {
    return new Date().getMonth() + 1;
  }

  async init() {
    this.trans = this.state.setState("trans", await this.getTran());
    this.initEvent();
  }

  initEvent() {
    this.selectBoxClick();
    this.HistoryClick();
  }

  async getDayTran(type) {
    const datas = await getData(
      `/transaction/${this.getYear()}-${this.month}/expenditure/${type}`
    );
    return datas.data.data;
  }

  async getTran() {
    const datas = await getData(`/transaction/${this.getYear()}-${this.month}`);
    return datas.data.data;
  }

  //TODO: 로직수정
  selectBoxClick() {
    const historyHeader = $el("#app");
    historyHeader.addEventListener("click", (e) => {
      if (e.target.className === "tranHistory_header--income") {
        const newSelectState = {
          ...this.slectType,
          income: !this.slectType.income,
        };
        this.slectType = this.state.setState("selectType", newSelectState);
      }
      if (e.target.className === "tranHistory_header--expenditure") {
        const newSelectState = {
          ...this.slectType,
          expenditure: !this.slectType.expenditure,
        };
        this.slectType = this.state.setState("selectType", newSelectState);
      }
      this.trans = this.state.getState("trans");
      let returnedTrans = this.trans;
      let dayTran = this.trans;
      if (this.slectType.income && !this.slectType.expenditure) {
        returnedTrans = this.trans.filter((tran) => tran.isIncome);
      }
      if (!this.slectType.income && this.slectType.expenditure) {
        returnedTrans = this.trans.filter((tran) => !tran.isIncome);
      }
      if (!this.slectType.income && !this.slectType.expenditure) {
        returnedTrans = [];
      }
      this.notify(MONEY_SELECT_BOX_CLICK, {
        trans: returnedTrans,
        type: this.slectType,
        dayTran: dayTran,
      });
    });
  }

  HistoryClick() {
    // TORO 이벤트 위임시 겹치는 문제 해결.
    //https://juein.tistory.com/63
    const tranHistory = $el(".tranHistory");
    tranHistory.addEventListener("click", (e) => {
      if (e.target.className === "tranHistory_body__content--update") {
        this.state.setState("tranMode", "수정");
        this.notify(TRAN_HISTORY_CLICK, {
          tranInputs: JSON.parse(e.target.parentNode.parentNode.dataset.info),
          categorys: this.categorys,
          payments: this.state.getState("payment"),
          tranMode: "수정",
        });
      }
    });
  }
}

export default TranHistoryModel;

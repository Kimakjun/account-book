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

  async getTran() {
    const datas = await getData(`/transaction/${this.getYear()}-${this.month}`);
    return datas.data.data;
  }

  selectBoxClick() {
    const historyHeader = $el(".tranHistory");
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
      });
    });
  }

  HistoryClick() {
    // TORO 이벤트 위임시 겹치는 문제 해결.
    //https://juein.tistory.com/63
    const tranHistory = $el(".tranHistory");
    tranHistory.addEventListener("click", (e) => {
      if (e.target.className === "tranHistory_body__content--each") {
        this.notify(TRAN_HISTORY_CLICK, {
          tranInputs: JSON.parse(e.target.dataset.info),
          categorys: this.categorys,
          payments: this.payments,
        });
      }
    });
  }
  v;
}

export default TranHistoryModel;

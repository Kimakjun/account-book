import { getData } from "../util/api";
import { $el } from "../util/dom";
import Observable from "./Observable";
import {
  MONTH_BUTTON_CLICK,
  TRAN_HISTORY_CLICK,
  MONEY_SELECT_BOX_CLICK,
} from "../util/event";
class NavbarModel extends Observable {
  constructor() {
    super();
    this.month = this.getMonth();
    this.trans;
    this.slectType = { income: true, expenditure: true };
    this.categorys;
    this.payments;
    this.init();
  }

  async init() {
    this.trans = await this.getTran();
    this.categorys = await this.getCategory();
    this.payments = await this.getPayments();
    this.initEvent();
  }

  initEvent() {
    this.HistoryClick();
    this.monthButtonClick();
    this.selectBoxClick();
    this.deleteInputForm;
  }

  async getCategory() {
    const res = await getData(`/category`);
    return res.data.data;
  }

  async getPayments() {
    const res = await getData(`/payment`);
    return res.data.data;
  }

  async getTran() {
    const datas = await getData(`/transaction/${this.getYear()}-${this.month}`);
    return datas.data.data;
  }

  getYear() {
    return new Date().getFullYear();
  }
  getMonth() {
    return new Date().getMonth() + 1;
  }

  getMonthByType(classList) {
    if (classList.contains("right")) {
      this.month = this.month + 1 == 13 ? 1 : this.month + 1;
      return this.month;
    }
    if (classList.contains("left")) {
      this.month = this.month - 1 === 0 ? 12 : this.month - 1;
      return this.month;
    }
    return null;
  }

  async monthButtonClick() {
    const monthSelector = $el(".navbar__monthSelector");
    monthSelector.addEventListener("click", async (e) => {
      if (this.getMonthByType(e.target.classList) === null) return;
      this.trans = await this.getTran();
      this.notify(MONTH_BUTTON_CLICK, {
        month: this.month,
        trans: this.trans,
      });
    });
  }

  selectBoxClick() {
    const historyHeader = $el(".tranHistory");
    historyHeader.addEventListener("click", (e) => {
      if (e.target.className === "tranHistory_header--income") {
        this.slectType = { ...this.slectType, income: !this.slectType.income };
      }
      if (e.target.className === "tranHistory_header--expenditure") {
        this.slectType = {
          ...this.slectType,
          expenditure: !this.slectType.expenditure,
        };
      }
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
}

export default NavbarModel;

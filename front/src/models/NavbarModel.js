import { getData } from "../util/api";
import { $el } from "../util/dom";
import Observable from "./Observable";
import { MONTH_BUTTON_CLICK, NAVBAR_CHANGE } from "../util/event";
class NavbarModel extends Observable {
  constructor({ state }) {
    super();
    this.trans;
    this.state = state;
    this.month = this.getMonth();
    this.init();
  }

  async init() {
    this.trans = this.state.setState("trans", await this.getTran());
    this.initEvent();
    this.initSetting();
  }

  initEvent() {
    this.monthButtonClick();
    this.navbarChange();
  }

  async initSetting() {
    const newTranDay = await this.getDayTran();
    const totlaExpenditure = this.getTotalExpenditure(this.trans);
    const averageExpenditure = this.getAaverageExpenditure(
      totlaExpenditure,
      this.month
    );

    this.notify(MONTH_BUTTON_CLICK, {
      month: this.month,
      trans: this.trans,
      averageExpenditure: averageExpenditure,
      totlaExpenditure: totlaExpenditure,
      transDay: newTranDay,
    });
  }

  async getTran() {
    const datas = await getData(`/transaction/${this.getYear()}-${this.month}`);
    return datas.data.data;
  }

  async getDayTran() {
    const datas = await getData(
      `/transaction/${this.getYear()}-${this.month}/expenditure/0`
    );
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

  getTotalExpenditure(trans) {
    return trans.reduce((acc, cur) => {
      if (!cur.isIncome) acc += cur.amount;
      return acc;
    }, 0);
  }

  getAaverageExpenditure(total, month) {
    const DAYS = [0, 31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return Math.ceil(total / DAYS[month]);
  }

  async monthButtonClick() {
    const monthSelector = $el(".navbar__monthSelector");
    monthSelector.addEventListener("click", async (e) => {
      if (this.getMonthByType(e.target.classList) === null) return;
      const newTran = await this.getTran();
      const newTranDay = await this.getDayTran();
      const totlaExpenditure = this.getTotalExpenditure(newTran);
      const averageExpenditure = this.getAaverageExpenditure(
        totlaExpenditure,
        this.month
      );

      this.trans = this.state.setState("trans", newTran);

      this.notify(MONTH_BUTTON_CLICK, {
        month: this.month,
        trans: this.trans,
        transDay: newTranDay,
        averageExpenditure: averageExpenditure,
        totlaExpenditure: totlaExpenditure,
      });
    });
  }

  navbarChange() {
    $el(".navbar__contentSelector").addEventListener("click", (e) => {
      if (e.target.className == "navbar__contentSelctor--history") {
        this.notify(NAVBAR_CHANGE, { type: "TRANSACTION" });
      }
      if (e.target.className == "navbar__contentSelctor--analysis") {
        this.notify(NAVBAR_CHANGE, { type: "STATISTIC" });
      }
    });
  }
}

export default NavbarModel;

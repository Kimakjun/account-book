import { getData } from "../util/api";
import { $el } from "../util/dom";
import Observable from "./Observable";
import { MONTH_BUTTON_CLICK } from "../util/event";
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
  }

  initEvent() {
    this.monthButtonClick();
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
      const newTran = await this.getTran();
      this.trans = this.state.setState("trans", newTran);
      this.notify(MONTH_BUTTON_CLICK, {
        month: this.month,
        trans: this.trans,
      });
    });
  }
}

export default NavbarModel;

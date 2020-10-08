import { getData } from "../util/api";
import { $el } from "../util/dom";
import Observable from "./Observable";
import { MONTH_BUTTON_CLICK, TRAN_HISTORY_CLICK } from "../util/event";
class NavbarModel extends Observable {
  constructor() {
    super();
    this.month = "";
    this.trans = [];
    this.init();
  }

  init() {
    this.HistoryClick();
    this.monthButtonClick();
    this.month = this.getMonth();
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

  monthButtonClick() {
    const monthSelector = $el(".navbar__monthSelector");
    monthSelector.addEventListener("click", async (e) => {
      if (this.getMonthByType(e.target.classList) === null) return;
      this.trans = await getData(
        `/transaction/${this.getYear()}-${this.month}`
      );
      this.notify(MONTH_BUTTON_CLICK, {
        month: this.month,
        trans: this.trans.data.data,
      });
    });
  }

  HistoryClick() {
    // TORO 이벤트 위임시 겹치는 문제 해결.
    //https://juein.tistory.com/63
    const tranHistory = $el(".tranHistory");
    tranHistory.addEventListener("click", (e) => {
      if (e.target.className === "tranHistory__history") {
        this.notify(TRAN_HISTORY_CLICK, {
          tranInputs: "새로운 데이터 갑니다~!",
        });
      }
    });
  }
}

export default NavbarModel;

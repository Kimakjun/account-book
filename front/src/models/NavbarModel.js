import { getData } from "../util/api";
import { $el } from "../util/dom";
import Observable from "./Observable";
import {
  MONTH_BUTTON_CLICK,
  TRAN_HISTORY_CLICK,
  MONEY_SELECT_BOX_CLICK,
  CLEAN_TRAN_FORM,
  ENTER_TRAN_VALUE,
} from "../util/event";
class NavbarModel extends Observable {
  constructor() {
    super();
    this.month = this.getMonth();
    this.trans;
    this.tranInputs = {
      date: "",
      categoryId: "",
      paymentId: "",
      amount: "",
      content: "",
    }; // 변화값관리하다 확인시 보내면 되는 정보.
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
    this.cleanTranForm();
    this.moneyTypeToogle();
    this.tranInputChange();
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

  moneyTypeToogle() {
    const tranInput = $el(".tranInput");
    tranInput.addEventListener("click", (e) => {
      if (
        e.target.classList.contains(
          "tranInput__firstSection__clasify--isIncome"
        ) ||
        e.target.classList.contains(
          "tranInput__firstSection__clasify--isExpenditure"
        )
      ) {
        $el(".tranInput__firstSection__clasify--isIncome").classList.toggle(
          "selected"
        );
        $el(
          ".tranInput__firstSection__clasify--isExpenditure"
        ).classList.toggle("selected");
      }
    });
  }

  tranInputChange() {
    const tranInput = $el(".tranInput");
    tranInput.addEventListener("input", (e) => {
      const { name } = e.target;
      if (name === "date") {
        this.tranInputs = { ...this.tranInputs, date: e.target.value };
      }
      if (name === "content") {
        this.tranInputs = { ...this.tranInputs, content: e.target.value };
      }
      if (name === "amount") {
        const newValue = e.target.value.replace(/[,||원]+/gi, "");
        console.log(newValue, "test");
        if (isNaN(newValue)) {
          e.target.value = "";
          return alert("금액은 숫자만 입력하세요!");
        }
        this.tranInputs = { ...this.tranInputs, amount: newValue };
      }
      if (name === "category") {
        for (let i of e.target.options) {
          if (i.selected) {
            this.tranInputs = { ...this.tranInputs, categoryId: i.dataset.id };
          }
        }
      }
      if (name === "payment") {
        for (let i of e.target.options) {
          if (i.selected) {
            this.tranInputs = { ...this.tranInputs, categoryId: i.dataset.id };
          }
        }
      }
      console.log(this.tranInputs);
      this.notify(ENTER_TRAN_VALUE, { tranInputs: this.tranInputs });
    });
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

  cleanTranForm() {
    const tranInput = $el(".tranInput");
    tranInput.addEventListener("click", (e) => {
      if (e.target.className === "tranInput__firstSection__update--delete") {
        this.tranInputs = {
          date: "",
          categoryId: "",
          paymentId: "",
          amount: "",
          content: "",
        };
        this.notify(CLEAN_TRAN_FORM, {
          categorys: this.categorys,
          payments: this.payments,
        });
      }
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

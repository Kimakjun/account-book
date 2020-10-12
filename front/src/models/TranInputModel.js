import { getData } from "../util/api";
import { $el } from "../util/dom";
import Observable from "./Observable";
import {
  CLEAN_TRAN_FORM,
  ENTER_TRAN_VALUE,
  MONEY_TYPE_CLICK,
} from "../util/event";
class TranInputModel extends Observable {
  constructor({ state }) {
    super();
    this.state = state;
    this.trans;
    this.categorys;
    this.payments;
    this.init();
  }

  async init() {
    this.trans = this.state.setState("trans", await this.getTran());
    this.categorys = this.state.setState("category", await this.getCategory());
    this.payments = this.state.setState("payment", await this.getPayments());
    this.initEvent();
  }

  initEvent() {
    this.cleanTranForm();
    this.moneyTypeToogle();
    this.tranInputChange();
    this.createNewTran();
  }

  async getCategory() {
    const res = await getData(`/category`);
    return res.data.data;
  }

  async getPayments() {
    const res = await getData(`/payment`);
    console.log(res.data.data);
    return res.data.data;
  }

  async getTran() {
    const datas = await getData(
      `/transaction/${this.getYear()}-${this.getMonth()}`
    );
    return datas.data.data;
  }

  getYear() {
    return new Date().getFullYear();
  }
  getMonth() {
    return new Date().getMonth() + 1;
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
        const isIncome = e.target.classList.contains(
          "tranInput__firstSection__clasify--isIncome"
        );
        $el(".tranInput__firstSection__clasify--isIncome").classList.toggle(
          "selected"
        );
        $el(
          ".tranInput__firstSection__clasify--isExpenditure"
        ).classList.toggle("selected");
        this.notify(MONEY_TYPE_CLICK, { categorys: this.categorys, isIncome });
      }
    });
  }

  tranInputChange() {
    const tranInput = $el(".tranInput");
    tranInput.addEventListener("input", (e) => {
      const { name } = e.target;
      if (name === "amount") {
        const newValue = e.target.value.replace(/[,||원]+/gi, "");
        if (isNaN(newValue)) {
          e.target.value = "";
          return alert("금액은 숫자만 입력하세요!");
        }
        this.notify(ENTER_TRAN_VALUE, { amount: newValue });
      }
    });
  }

  cleanTranForm() {
    const tranInput = $el(".tranInput");
    tranInput.addEventListener("click", (e) => {
      if (e.target.className === "tranInput__firstSection__update--delete") {
        this.notify(CLEAN_TRAN_FORM, {
          categorys: this.categorys,
          payments: this.payments,
        });
      }
    });
  }

  createNewTran() {
    // 전송할 값들 다 가지와서
    // 이상한 값이 입력되지 않았으면
    // 보내고.
    // 잘 생성이됬으면. 입력폼 초기화하고, 새로운 데이터로 다시 그려주면될듯.
  }
}

export default TranInputModel;

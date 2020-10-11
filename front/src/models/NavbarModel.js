import { getData, postData, deleteData } from "../util/api";
import { $el, setStyle } from "../util/dom";
import Observable from "./Observable";
import {
  MONTH_BUTTON_CLICK,
  TRAN_HISTORY_CLICK,
  MONEY_SELECT_BOX_CLICK,
  CLEAN_TRAN_FORM,
  ENTER_TRAN_VALUE,
  MONEY_TYPE_CLICK,
  MANAGEMENT_MADAL_OPEN,
  MONEY_MANAGEMENT_CHANGE,
  PAYMENT_CHANGE,
} from "../util/event";
class NavbarModel extends Observable {
  constructor() {
    super();
    this.month = this.getMonth();
    this.trans;
    this.tranInputs = {
      isIncome: "",
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
    this.ModalControl();
    this.createMoneyManagement();
    this.deleteMoneyManagement();
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

  createMoneyManagement() {
    // create 눌렀을때 , dataset. 으로 카테고리, 결제수단 판단
    // 보내고 응답이 오면 카테고리, 페이먼트 상태 갱신하고, 인풋폼, 모달 폼새로 그려줌
    // 삭제도 마찬가지
    $el(".modal").addEventListener("click", (e) => {
      if (e.target.className === "modal__inputContent--button") {
        if (e.target.dataset.type === "결제수단") {
          const content = $el(".modal__inputContent--input").value;
          if (content.length === 0) return;
          postData("/payment", { content: content })
            .then(async () => {
              this.payments = await this.getPayments();
              this.notify(MONEY_MANAGEMENT_CHANGE, {
                datas: this.payments,
                type: "결제수단",
              });
              this.notify(PAYMENT_CHANGE, { payments: this.payments });
              this.tranInputs = { ...this.tranInputs, paymentId: "" };
            })
            .catch((err) => {
              console.error(err);
            });
        }
        // if(e.target.dataset.type === '카테고리'){

        // }
      }
    });
  }

  deleteMoneyManagement() {
    $el(".modal").addEventListener("click", (e) => {
      if (e.target.className === "modal__cotentList__content--delete") {
        if (e.target.dataset.type === "결제수단") {
          if (!confirm("정말로 삭제하시겠습니까 ?")) return;
          deleteData(`/payment/${e.target.id}`)
            .then(async () => {
              this.payments = await this.getPayments();
              this.notify(MONEY_MANAGEMENT_CHANGE, {
                datas: this.payments,
                type: "결제수단",
              });
              this.notify(PAYMENT_CHANGE, { payments: this.payments });
              this.tranInputs = { ...this.tranInputs, paymentId: "" };
            })
            .catch((err) => {
              console.error(err);
            });
        }
        // if(e.target.dataset.type === '카테고리'){

        // }
      }
    });
  }

  ModalControl() {
    $el(".header").addEventListener("click", (e) => {
      if (e.target.className === "util__category") {
        setStyle($el(".modal"), { display: "flex" });
        this.notify(MANAGEMENT_MADAL_OPEN, {
          datas: this.categorys,
          type: "카테고리",
        });
      }
      if (e.target.className === "util__payment") {
        setStyle($el(".modal"), { display: "flex" });
        this.notify(MANAGEMENT_MADAL_OPEN, {
          datas: this.payments,
          type: "결제수단",
        });
      }
    });

    $el(".modal").addEventListener("click", (e) => {
      if (e.target.className === "modal__header--delete") {
        setStyle($el(".modal"), { display: "none" });
      }
    });
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
        this.tranInputs = {
          ...this.tranInputs,
          isIncome: isIncome,
          categoryId: "",
        };
        this.notify(MONEY_TYPE_CLICK, { categorys: this.categorys, isIncome });
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
            this.tranInputs = { ...this.tranInputs, paymentId: i.dataset.id };
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
        console.log(this.payments);
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

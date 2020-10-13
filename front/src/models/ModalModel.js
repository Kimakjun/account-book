import { getData, postData, deleteData } from "../util/api";
import { $el, setStyle } from "../util/dom";
import Observable from "./Observable";

import {
  MANAGEMENT_MADAL_OPEN,
  MONEY_MANAGEMENT_CHANGE,
  PAYMENT_CHANGE,
} from "../util/event";

class ModalModel extends Observable {
  constructor({ state }) {
    super();
    this.state = state;
    this.categorys;
    this.payments;
    this.init();
  }

  async init() {
    this.categorys = this.state.setState("category", await this.getCategory());
    this.payments = this.state.setState("payment", await this.getPayments());
    this.initEvent();
  }

  initEvent() {
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
    return res.data.data;
  }

  createMoneyManagement() {
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
            })
            .catch((err) => {
              console.error(err);
            });
        }
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
              //this.tranInputs = { ...this.tranInputs, paymentId: "" };
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
        return alert("준비중입니다!");
        // setStyle($el(".modal"), { display: "flex" });
        // this.notify(MANAGEMENT_MADAL_OPEN, {
        //   datas: this.categorys,
        //   type: "카테고리",
        // });
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
}

export default ModalModel;

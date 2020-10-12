import { deleteData, getData, putData, postData } from "../util/api";
import { $el } from "../util/dom";
import Observable from "./Observable";
import {
  CLEAN_TRAN_FORM,
  ENTER_TRAN_VALUE,
  MONEY_TYPE_CLICK,
  CREATE_TRAN_VALUE,
  DELETE_TRAN_UPDATE,
  DELETE_TRAN,
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
    this.cancleTranUpdate();
    this.deleteTran();
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

  getSelectedId(type) {
    const options = $el(`.${type}`);
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) return options[i].dataset.id;
    }
    return false;
  }

  createNewTran() {
    $el(".tranInput").addEventListener("click", (e) => {
      if (e.target.className !== "tranInputContainer__lastSection--button")
        return;
      const amount = $el(
        ".tranInput__firstSection__money--input"
      ).value.replace(/[,||원]+/gi, "");
      const content = $el(".tranInput__firstSection__content--content").value;
      const isIncome = $el(
        ".tranInput__firstSection__clasify"
      ).children[1].classList.contains("selected");
      const date = $el(".tranInputContainer__secondSection__date--date").value;
      const categoryId = this.getSelectedId("category");
      const paymentId = this.getSelectedId("payment");
      if (!amount || !content || !date || !categoryId || !paymentId)
        return alert("올바른 값 입력하세요.");

      const tranMode = this.state.getState("tranMode");
      if (tranMode === "생성") {
        postData("/transaction", {
          amount,
          content,
          isIncome,
          date,
          categoryId,
          paymentId,
        })
          .then(async (res) => {
            if (res.data.success) {
              // TODO: 응답이성공이면 서버에서 받지말고 생성된 값만 기존값에 추가하여 랜더링하기
              const newTran = await this.getTran();
              this.trans = this.state.setState("trans", newTran);
              this.notify(CLEAN_TRAN_FORM, {
                categorys: this.categorys,
                payments: this.payments,
              });
              this.notify(CREATE_TRAN_VALUE, {
                trans: this.trans,
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
      if (tranMode === "수정") {
        putData(`/transaction/${e.target.dataset.id}`, {
          amount,
          content,
          isIncome,
          date,
          categoryId,
          paymentId,
        })
          .then(async (res) => {
            if (res.data.success) {
              // TODO: 응답이성공이면 서버에서 받지말고 생성된 값만 기존값에 추가하여 랜더링하기
              const newTran = await this.getTran();
              this.state.setState("tranMode", "생성");
              this.trans = this.state.setState("trans", newTran);
              this.notify(CLEAN_TRAN_FORM, {
                categorys: this.categorys,
                payments: this.payments,
              });
              this.notify(CREATE_TRAN_VALUE, {
                trans: this.trans,
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }

  cancleTranUpdate() {
    $el(".tranInput").addEventListener("click", (e) => {
      if (e.target.className === "tranInput__firstSection__update--cancle") {
        this.state.setState("tranMode", "생성");
        this.notify(DELETE_TRAN_UPDATE, {
          categorys: this.categorys,
          payments: this.payments,
          tranMode: "생성",
        });
      }
    });
  }

  deleteTran() {
    $el(".tranInput").addEventListener("click", (e) => {
      if (e.target.className === "tranInput__firstSection__update--tranDlete") {
        const deleteTranId = e.target.dataset.id;
        if (!confirm("정말로 삭제하시겠습니까?")) return;
        deleteData(`/transaction/${deleteTranId}`)
          .then(async (res) => {
            if (res.data.success) {
              const newTrans = await this.getTran();
              this.tran = this.state.setState("trans", newTrans);
              this.state.setState("tranMode", "생성");
              this.notify(DELETE_TRAN, {
                categorys: this.categorys,
                payments: this.payments,
                tranMode: "생성",
                trans: newTrans,
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }
}

export default TranInputModel;

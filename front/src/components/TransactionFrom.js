import { $el, $new } from "../util/dom";
import "../public/tranInput.scss";
import {
  TRAN_HISTORY_CLICK,
  CLEAN_TRAN_FORM,
  ENTER_TRAN_VALUE,
  MONEY_TYPE_CLICK,
  PAYMENT_CHANGE,
  DELETE_TRAN_UPDATE,
  DELETE_TRAN,
  NAVBAR_CHANGE,
} from "../util/event";
import { getData } from "../util/api";
class TransactionForm {
  constructor({ root }) {
    this.root = root;
    this.initCategory;
    this.initPayments;
    this.transactionInput = $new("div", "tranInput");
    this.init();
    this.render();
  }

  subscribeHistory(model) {
    model.subscribe(TRAN_HISTORY_CLICK, this.setTranInput.bind(this));
  }

  subscribeTranInput(model) {
    model.subscribe(ENTER_TRAN_VALUE, this.updateTranInput.bind(this));
    model.subscribe(MONEY_TYPE_CLICK, this.changeCategoryBox.bind(this));
    model.subscribe(CLEAN_TRAN_FORM, this.setTranInput.bind(this));
    model.subscribe(DELETE_TRAN_UPDATE, this.setTranInput.bind(this));
    model.subscribe(DELETE_TRAN, this.setTranInput.bind(this));
  }

  subscribeModal(model) {
    model.subscribe(PAYMENT_CHANGE, this.changePaymentBox.bind(this));
  }
  subscribeNavBar(model) {
    model.subscribe(NAVBAR_CHANGE, this.viewChange.bind(this));
  }

  async init() {
    this.initCategory = await this.getCategory();
    this.payments = await this.getPayments();
    this.drawTransactionInput({});
  }

  async getCategory() {
    const res = await getData(`/category`);
    return res.data.data;
  }

  async getPayments() {
    const res = await getData(`/payment`);
    return res.data.data;
  }

  viewChange({ type }) {
    if (type === "TRANSACTION") {
      this.transactionInput.style.display = "flex";
    } else {
      this.transactionInput.style.display = "none";
    }
  }

  getDateForm(rowDate) {
    const date = new Date(rowDate);
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`;
  }

  getMoneyForm(rowMoney) {
    return Number(rowMoney).toLocaleString("en") + "원";
  }

  updateTranInput({ amount }) {
    console.log(amount, this.getMoneyForm(amount));
    $el(".tranInput__firstSection__money--input").value = this.getMoneyForm(
      amount
    );
  }

  setTranInput({ tranInputs, categorys, payments, tranMode }) {
    this.drawTransactionInput({
      inputsData: tranInputs,
      categorys,
      payments,
      tranMode,
    });
  }

  changeCategoryBox({ categorys, isIncome }) {
    const moneyType = isIncome ? "수입" : "지출";
    const category = $el(".category");
    if (!category) return;
    category.innerHTML = `
      <option value="category">카테고리</option>
        ${categorys.reduce((acc, cur) => {
          if (cur.isIncome !== moneyType) return acc;
          acc += `<option data-id=${cur.id} value=${cur.content}>${cur.content}</option>`;
          return acc;
        })}
    `;
  }

  changePaymentBox({ payments }) {
    const payment = $el(".payment");
    if (!payment) return;
    payment.innerHTML = `
      <option value="payment">결제수단</option>
    ${payments.reduce((acc, cur) => {
      acc += `<option data-id=${cur.id} value=${cur.content}>
                  ${cur.content}
                </option>`;
      return acc;
    }, "")}
    `;
  }

  drawTransactionInput({
    inputsData = { isIncome: false },
    categorys = this.initCategory,
    payments = this.payments,
    tranMode = "생성",
  }) {
    const date = this.getDateForm(inputsData.createdAt);
    const moneyType = inputsData.isIncome ? "수입" : "지출";
    this.transactionInput.innerHTML = `
    <div class="tranInput__firstSection">
        <div class="tranInput__firstSection__clasify">
            <span>분류</span>
            <div class="tranInput__firstSection__clasify--isIncome ${
              inputsData.isIncome ? "selected" : ""
            }">수입</div>
            <div class="tranInput__firstSection__clasify--isExpenditure ${
              !inputsData.isIncome ? "selected" : ""
            }">지출</div>
        </div>
        <div class="tranInput__firstSection__update">
            ${
              tranMode === "생성"
                ? `<button class="tranInput__firstSection__update--delete">내용 지우기</button>`
                : `<button class="tranInput__firstSection__update--tranDlete" data-id=${inputsData.id}>삭제</button>
              <button class="tranInput__firstSection__update--cancle">취소</button> 
              `
            }
        </div>
    </div>
    <div class="tranInputContainer__secondSection">
        <div class="tranInputContainer__secondSection__date">
            <span>날짜</span>
            <input class="tranInputContainer__secondSection__date--date" name="date" type="date" value="${date}"/>
        </div>
        <div class="tranInputContainer__secondSection__category">
            <span>카테고리</span>
            <select class="category" name="category">
                <option value="category">카테고리</option>
                ${categorys.reduce((acc, cur) => {
                  if (cur.isIncome !== moneyType) return acc;

                  acc += `<option 
                            data-id=${cur.id} value=${cur.content}
                            ${
                              inputsData.category &&
                              cur.id === inputsData.category.id
                                ? "selected"
                                : ""
                            }
                            >
                            ${cur.content}
                            </option>`;
                  return acc;
                })}
            </select>
        </div>
        <div class="tranInputContainer__secondSection__payment">
            <span>결제수단</span>
            <select class="payment" name="payment">
                <option value="payment">결제수단</option>
                ${
                  payments.length !== 0 &&
                  payments.reduce((acc, cur) => {
                    acc += `<option 
                              data-id=${cur.id} value=${cur.content}
                              ${
                                inputsData.payment &&
                                cur.id === inputsData.payment.id
                                  ? "selected"
                                  : ""
                              }
                            >
                              ${cur.content}
                            </option>`;
                    return acc;
                  }, "")
                }
            </select>
        </div>
    </div>
    <div class="tranInputContainer__thirdSection">
        <div class="tranInput__firstSection__money">
            <span>금액</span>
            <input class="tranInput__firstSection__money--input" name="amount" value="${
              inputsData.amount || ""
            }" />
        </div>
        <div class="tranInput__firstSection__content">
            <span>내용</span>
            <input class="tranInput__firstSection__content--content" name="content" value="${
              inputsData.content || ""
            }" />
        </div>
    </div>
    <div class="tranInputContainer__lastSection--button" data-id=${
      inputsData.id
    }>
        확인
    </div>    
    `;
  }

  render() {
    this.root.appendChild(this.transactionInput);
  }
}

export default TransactionForm;

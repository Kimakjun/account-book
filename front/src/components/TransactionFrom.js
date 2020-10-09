import { $new } from "../util/dom";
import "../public/tranInput.scss";
import { TRAN_HISTORY_CLICK, CLEAN_TRAN_FORM } from "../util/event";
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

  subscribe(model) {
    model.subscribe(TRAN_HISTORY_CLICK, this.setTranInput.bind(this));
    model.subscribe(CLEAN_TRAN_FORM, this.setTranInput.bind(this));
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

  setTranInput({ tranInputs, categorys, payments }) {
    // 모델에서 받은 데이터로 돔 업데이트~!
    this.drawTransactionInput({ inputsData: tranInputs, categorys, payments });
    console.log(tranInputs);
  }

  drawTransactionInput({
    inputsData = { isIncome: false },
    categorys = this.initCategory,
    payments = this.payments,
  }) {
    const date = this.getDateForm(inputsData.createdAt);
    const moneyType = inputsData.isIncome ? "수입" : "지출";
    console.log(categorys);
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
            <button class="tranInput__firstSection__update--delete">내용 지우기</button>
        </div>
    </div>
    <div class="tranInputContainer__secondSection">
        <div class="tranInputContainer__secondSection__date">
            <span>날짜</span>
            <input type="date" value="${date}"/>
        </div>
        <div class="tranInputContainer__secondSection__date">
            <span>카테고리</span>
            <select name="category">
                <option value="category">카테고리</option>
                ${categorys.reduce((acc, cur) => {
                  if (cur.isIncome !== moneyType) return acc;
                  acc += `<option value=${cur.content}>${cur.content}</option>`;
                  return acc;
                })}
            </select>
        </div>
        <div class="tranInputContainer__secondSection__date">
            <span>결제수단</span>
            <select name="category">
                <option value="category">결제수단</option>
                ${
                  payments.length !== 0 &&
                  payments.reduce((acc, cur) => {
                    acc += `<option value=${cur.content}>${cur.content}</option>`;
                    return acc;
                  })
                }
            </select>
        </div>
    </div>
    <div class="tranInputContainer__thirdSection">
        <div class="tranInput__firstSection__money">
            <span>금액</span>
            <input value="${inputsData.amount || ""}" />
        </div>
        <div class="tranInput__firstSection__content">
            <span>내용</span>
            <input value="${inputsData.content || ""}" />
        </div>
    </div>
    <div class="tranInputContainer__lastSection--button">
        확인
    </div>    
    `;
  }

  render() {
    this.root.appendChild(this.transactionInput);
  }
}

export default TransactionForm;

import { $el, $new } from "../util/dom";
import "../public/tranInput.scss";
import { TRAN_HISTORY_CLICK } from "../util/event";

class TransactionForm {
  constructor({ root }) {
    this.root = root;
    this.transactionInput = $new("div", "tranInput");
    this.init();
    this.render();
  }

  subscribe(model) {
    model.subscribe(TRAN_HISTORY_CLICK, this.setTranInput.bind(this));
  }

  setTranInput({ tranInputs }) {
    // 모델에서 받은 데이터로 돔 업데이트~!
    const test = $el(".tranInput__firstSection__content input");
    test.value = tranInputs;
  }

  init() {
    this.transactionInput.innerHTML = `
        <div class="tranInput__firstSection">
            <div class="tranInput__firstSection__clasify">
                <span>분류</span>
                <div class="tranInput__firstSection__clasify--isIncome">수입</div>
                <div class="tranInput__firstSection__clasify--isExpenditure selected ">지출</div>
            </div>
            <div class="tranInput__firstSection__update">
                <button class="tranInput__firstSection__update--delete">내용 지우기</button>
            </div>
        </div>
        <div class="tranInputContainer__secondSection">
            <div class="tranInputContainer__secondSection__date">
                <span>날짜</span>
                <input type="date"/>
            </div>
            <div class="tranInputContainer__secondSection__date">
                <span>카테고리</span>
                <select name="category">
                    <option value="외식">외식</option>
                    <option value="뷰티">뷰티</option>
                    <option value="생활" selected="selected">생활</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            <div class="tranInputContainer__secondSection__date">
                <span>결제수단</span>
                <select name="category">
                    <option value="외식">외식</option>
                    <option value="뷰티">뷰티</option>
                    <option value="생활" selected="selected">생활</option>
                    <option value="기타">기타</option>
                </select>
            </div>
        </div>
        <div class="tranInputContainer__thirdSection">
            <div class="tranInput__firstSection__money">
                <span>금액</span>
                <input/>
            </div>
            <div class="tranInput__firstSection__content">
                <span>내용</span>
                <input/>
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

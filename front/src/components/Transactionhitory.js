import { getData } from "../util/api";
import { $new } from "../util/dom";
import "../public/tranHistory.scss";
import { MONTH_BUTTON_CLICK, MONEY_SELECT_BOX_CLICK } from "../util/event";

class TransactionHistory {
  constructor({ root }) {
    this.root = root;
    this.transactionHistory = $new("div", "tranHistory");
    this.init();
    this.render();
  }

  subscribeNavBar(model) {
    model.subscribe(MONTH_BUTTON_CLICK, this.getTrans.bind(this));
  }

  subscribeHistory(model) {
    model.subscribe(MONEY_SELECT_BOX_CLICK, this.getTrans.bind(this));
  }

  getTrans({ trans, type }) {
    this.transactionHistory.innerHTML = ``;
    this.drawTranHistoryHeader({ trans, type });
    this.drawTranHistoryBody({ trans });
  }

  async getInitTran() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const {
      data: { data },
    } = await getData(`/transaction/${year}-${month}`);
    return data;
  }

  // <div class="tranHistory__history">

  drawTranHistoryHeader({ trans, type }) {
    // 수입지출 최대값 설정!.
    let totalIncome = 0,
      totalExpenditure = 0;
    if (!type) type = { income: true, expenditure: true };
    trans.forEach((tran) => {
      if (tran.isIncome) totalIncome += tran.amount;
      else totalExpenditure += tran.amount;
    });
    const tranHistory_header = $new("div", "tranHistory_header");
    tranHistory_header.innerHTML = `
      <div class="tranHistory_header__income">
        <input class="tranHistory_header--income" name="checkbox" type="checkbox" value="수입" ${
          type.income ? `checked` : ``
        }/>
        <span>수입 ${Number(totalIncome).toLocaleString("en")} 원</span>
      </div>
      <div class="tranHistory_header__expenditure">
        <input class="tranHistory_header--expenditure" name="checkbox" type="checkbox" value="지출" ${
          type.expenditure ? `checked` : ``
        }/> 
        <span>지출 ${Number(totalExpenditure).toLocaleString("en")} 원</span>
      </div> 
      `;

    this.transactionHistory.appendChild(tranHistory_header);
  }

  drawTranHistoryBody({ trans }) {
    if (trans.length === 0) {
      this.transactionHistory.innerHTML += `<div class="tranHistory_body__empty">내역이 없네요.</div>`;
      return;
    }
    let date = "";
    let template = $new("div", "tranHistory_body");
    let tempTrans = { date: "", income: 0, expenditure: 0, _trans: [] };
    trans.forEach((tran) => {
      // 날짜별로 수입지출, 거래내역 분리.
      const income = tran.isIncome ? tran.amount : 0;
      const expenditure = tran.isIncome ? 0 : tran.amount;

      if (date !== new Date(tran.createdAt).getDate()) {
        template.appendChild(this.makeHistoryByDay(tempTrans));

        date = new Date(tran.createdAt).getDate();
        const month = new Date(tran.createdAt).getMonth() + 1;
        tempTrans = { month, date, income, expenditure, _trans: [tran] };
      } else {
        let newTrans = tempTrans._trans;
        newTrans.push(tran);
        tempTrans = {
          ...tempTrans,
          income: tempTrans.income + income,
          expenditure: tempTrans.expenditure + expenditure,
          _trans: newTrans,
        };
      }
    });
    template.appendChild(this.makeHistoryByDay(tempTrans));
    this.transactionHistory.appendChild(template);
  }

  makeHistoryByDay(tempTrans) {
    const tranHistory__wrapper = $new("div", "tranHistory_body__content");
    tranHistory__wrapper.innerHTML = tempTrans._trans.reduce(
      (acc, cur, index) => {
        if (index === 0) {
          acc += `
              <div class="tranHistory_body__content__header">
                <span class="tranHistory_body__content__header__date">${tempTrans.month}월 ${tempTrans.date}일</span> 
                <div>
                  <span class="tranHistory_body__content__header__income"> +${tempTrans.income}원</span>
                  <span class="tranHistory_body__content__header__expenditure"> -${tempTrans.expenditure}원 </span>
                </div>              
               </div>
              `;
        }
        acc += `
            <div class = "tranHistory_body__content--each" data-info=${JSON.stringify(
              { ...cur, month: tempTrans.month, date: tempTrans.date }
            )}>
              <div class="tranHistory_body__content--each__section1">
                <div class="tranHistory_body__content__category ${
                  cur.isIncome ? "incomeStyle" : "expenditureStyle"
                }">${cur.category.content}</div>
                <div class="tranHistory_body__content__content">${
                  cur.content
                }</div>
              </div>
              <div class="tranHistory_body__content--each__section2"> 
                <div class="tranHistory_body__content__payment">${
                  cur.payment.content
                }</div>
                <div class="tranHistory_body__content__isIncome  ${
                  cur.isIncome ? "incomeStyle__money" : "expenditureStyle_money"
                }">${cur.isIncome ? "+" : "-"}${cur.amount}</div>
              </div>
            </div>
            `;

        return acc;
      },
      ""
    );
    return tranHistory__wrapper;
  }

  async init() {
    const trans = await this.getInitTran();
    this.getTrans({ trans });
  }

  render() {
    this.root.appendChild(this.transactionHistory);
  }
}

export default TransactionHistory;

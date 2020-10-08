import { getData } from "../util/api";
import { $new } from "../util/dom";
import "../public/tranHistory.scss";
import { MONTH_BUTTON_CLICK, TRAN_HISTORY_CLICK } from "../util/event";

class TransactionHistory {
  constructor({ root }) {
    this.root = root;
    this.transactionHistory = $new("div", "tranHistory");
    this.init();
    this.render();
  }

  subscribe(model) {
    model.subscribe(MONTH_BUTTON_CLICK, this.getTrans.bind(this));
    model.subscribe(TRAN_HISTORY_CLICK, this.updateTrans.bind(this));
  }

  getTrans({ trans }) {
    this.drawTrans({ trans });
  }

  updateTrans() {}

  async getInitTran() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const {
      data: { data },
    } = await getData(`/transaction/${year}-${month}`);
    return data;
  }

  drawTrans({ trans }) {
    this.transactionHistory.innerHTML = `
      ${trans.reduce((acc, cur) => {
        const history = `
        <div class="tranHistory__history">
          <div>${cur.createdAt}</div>
          <div>${cur.category.content}</div>
          <div>${cur.content}</div>
          <div>${cur.payment.content}</div>
          <div>${cur.amount}</div>
        </div>  
          `;
        return acc + history;
      }, "")}
    `;
  }

  async init() {
    const trans = await this.getInitTran();
    this.drawTrans({ trans });
  }

  render() {
    this.root.appendChild(this.transactionHistory);
  }
}

export default TransactionHistory;

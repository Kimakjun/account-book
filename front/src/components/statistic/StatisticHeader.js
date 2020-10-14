import { MONTH_BUTTON_CLICK } from "../../util/event";

const { $new } = require("../../util/dom");

class StatisticHeader {
  constructor({ root }) {
    this.root = root;
    this.statisticHeader = $new("div", "statistic__header");
    this.init();
    this.render();
  }

  init() {
    this.statisticHeader.innerHTML = this.statisticHeaderTemplate();
  }

  subscribeNavBar(model) {
    model.subscribe(MONTH_BUTTON_CLICK, this.updateHeaderView.bind(this));
  }

  getMoneyForm(rowMoney) {
    console.log(rowMoney);
    return Number(rowMoney).toLocaleString("en") + "원";
  }

  getTotalExpenditure(trans) {
    return trans.reduce((acc, cur) => {
      if (!cur.isIncome) acc += cur.amount;
      return acc;
    }, 0);
  }

  getAaverageExpenditure(total, month) {
    const DAYS = [0, 31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return Math.ceil(total / DAYS[month]);
  }

  updateHeaderView({ trans, month }) {
    const totlaExpenditure = this.getTotalExpenditure(trans);
    const averageExpenditure = this.getAaverageExpenditure(
      totlaExpenditure,
      month
    );
    this.statisticHeader.innerHTML = this.statisticHeaderTemplate(
      this.getMoneyForm(totlaExpenditure),
      this.getMoneyForm(averageExpenditure)
    );
  }

  statisticHeaderTemplate(totlaExpenditure, averageExpenditure) {
    return `
            <div class="statistic__header__classify">
                <input type="radio" class="statistic__header__classify--category" name="classify" value="카테고리별 지출" checked="checked"/> 카테고리별 지출 
                <input type="radio" class="statistic__header__classify--day" name="classify" value="일별 지출" /> 일별 지출
            </div>
            <div class ="statistic__header__expenditure">
                <div class="statistic__header__expenditure__total">
                    이번달 지출금액 <span class="expenditure__total">${totlaExpenditure}</span>
                </div>
                <div class="statistic__header__expenditure__day">
                    <span class="expenditure__day">이번달 일 평균 ${averageExpenditure}</span>
                </div>
            </div>
        `;
  }

  render() {
    this.root.appendChild(this.statisticHeader);
  }
}

export default StatisticHeader;

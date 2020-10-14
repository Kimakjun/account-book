import { MONTH_BUTTON_CLICK } from "../../util/event";

const { $new, $el } = require("../../util/dom");

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
    return Number(rowMoney).toLocaleString("en") + "원";
  }

  updateHeaderView({ totlaExpenditure, averageExpenditure }) {
    $el(".expenditure__total").innerText = this.getMoneyForm(totlaExpenditure);
    $el(".expenditure__day").innerText = `이번달 일 평균 ${this.getMoneyForm(
      averageExpenditure
    )}`;
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
                    <span class="expenditure__day"${averageExpenditure}</span>
                </div>
            </div>
        `;
  }

  render() {
    this.root.appendChild(this.statisticHeader);
  }
}

export default StatisticHeader;

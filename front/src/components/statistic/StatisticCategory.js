import { $el, $new } from "../../util/dom";
import { MONTH_BUTTON_CLICK } from "../../util/event";

class StatiticCategory {
  constructor({ root }) {
    this.root = root;
    this.statisticCategory = $new("div", "statisticCategory");
    this.init();
    this.render();
  }

  subscribeNavBar(model) {
    model.subscribe(
      MONTH_BUTTON_CLICK,
      this.updateStatisticCategoryView.bind(this)
    );
  }

  getPercent(total, value) {
    return Math.ceil((value / total) * 100);
  }

  updateStatisticCategoryView({ transCategory, totlaExpenditure }) {
    console.log(totlaExpenditure, "총 지출 이걸로 퍼센트 구하자");
    console.log(transCategory, "데이터");
    const processedData = transCategory.map((tran) => {
      console.log(tran.total_amount / totlaExpenditure);
      const percent = this.getPercent(totlaExpenditure, tran.total_amount);
      const width = 6 * percent;
      return {
        content: tran.category.content,
        percent,
        width,
        total_amount: tran.total_amount,
      };
    });
    $el(".bar__chart").innerHTML = `
        ${processedData.reduce((acc, cur, index) => {
          if (index === 0) {
            acc += `<line x1="20" y1="${120 - 55}" x2="1050" y2="${
              120 - 55
            }"></line>`;
          }
          acc += `
            <rect x="250" y="${80 + 50 * index}" width="${
            cur.width
          }" height="30"></rect>
            <text x="20" y="${95 + 55 * index}">${cur.content}</text>
            <text class="percent" x="120" y="${95 + 55 * index}">${
            cur.percent
          }%</text>
            <text x="950" y="${95 + 55 * index}">${cur.total_amount} 원</text>
            <line x1="20" y1="${120 + 55 * index}" x2="1050" y2="${
            120 + 55 * index
          }"></line>
            `;
          return acc;
        }, "")}   

    `;
  }

  init() {
    this.statisticCategory.innerHTML = `
    <svg class="chart">
     <g class="bar__chart">
     </svg>
    `;
  }

  render() {
    this.root.appendChild(this.statisticCategory);
  }
}

export default StatiticCategory;

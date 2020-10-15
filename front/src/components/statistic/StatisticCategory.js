import { $el, $new } from "../../util/dom";
import { MONTH_BUTTON_CLICK } from "../../util/event";
import { COLOR } from "../../util/link";
class StatiticCategory {
  constructor({ root }) {
    this.root = root;
    this.statisticCategory = $new("div", "statisticCategory");
    this.init();
    this.render();
    this.addEvent();
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

  getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  updateStatisticCategoryView({ transCategory, totlaExpenditure }) {
    const processedData = transCategory.map((tran, index) => {
      const percent = this.getPercent(totlaExpenditure, tran.total_amount);
      const width = 6 * percent;
      return {
        content: tran.category.content,
        percent,
        width,
        total_amount: tran.total_amount,
        color: COLOR[index],
      };
    });

    const svgEl = document.querySelector(".svgPie");
    const slices = processedData.map((data) => ({
      percent: data.percent / 100,
      color: data.color,
    }));
    let cumulativePercent = 0;

    slices.forEach((slice, index) => {
      const [startX, startY] = this.getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.percent;

      const [endX, endY] = this.getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

      const pathData = [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `L 0 0`,
      ].join(" ");

      const pathEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pathEl.setAttribute("d", pathData);
      pathEl.setAttribute("fill", slice.color);
      pathEl.setAttribute("class", `svgPie--path`);
      pathEl.setAttribute("data-id", `svgPie--path--${index}`);
      svgEl.appendChild(pathEl);
    });

    $el(".bar__chart").innerHTML = `
        ${processedData.reduce((acc, cur, index) => {
          if (index === 0) {
            acc += `<line x1="20" y1="${120 - 50}" x2="1050" y2="${
              120 - 50
            }"></line>`;
          }
          acc += `
            <rect x="250" y="${80 + 50 * index}" width="${
            cur.width
          }" height="30" style="fill: ${cur.color}"}></rect>
            <text x="20" y="${95 + 55 * index}">${cur.content}</text>
            <text class="percent" x="120" y="${95 + 55 * index}">${
            cur.percent
          }%</text>
            <text x="950" y="${95 + 55 * index}">${cur.total_amount} 원</text>
            <line x1="20" y1="${120 + 50 * index}" x2="1050" y2="${
            120 + 50 * index
          }"></line>
            `;
          return acc;
        }, "")}   
    `;
  }

  init() {
    this.statisticCategory.innerHTML = `
    
    <svg class="svgPie" viewBox="-1 -1 2 2" style="transform: rotate(-90deg)">
    </svg>
    <svg class="chart">
     <g class="pie__chart"></g>
     <g class="bar__chart"></g>
    </svg>
    `;
  }

  render() {
    this.root.appendChild(this.statisticCategory);
  }
}

export default StatiticCategory;

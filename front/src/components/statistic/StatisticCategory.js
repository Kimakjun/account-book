import { $el, $new } from "../../util/dom";
import { MONTH_BUTTON_CLICK } from "../../util/event";
import { COLOR } from "../../util/link";
class StatiticCategory {
  constructor({ root }) {
    this.root = root;
    this.statisticCategory = $new("div", "statisticCategory");
    this.isData = true;
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

  showEachInfo(e) {
    if (e.target.getAttribute("class") === "svgPie--path") {
      $el(".chart__info__total").style.display = "none";
      const targetData = JSON.parse(e.target.getAttribute("data"));
      const infoTag = $el(".chart__info__each");
      if (this.isData === false) {
        infoTag.innerHTML = " 이번달 데이터는 없네요 ";
        return;
      }
      infoTag.innerHTML = `
          <div >Category : ${targetData.content}</div>
          <div>percent(%) : ${targetData.percent}%</div>
          <div>total_amount: ${targetData.total_amount}</dic>
      `;
    }
  }

  hiddenEachInfo(e) {
    if (this.idData === false) return;
    if (e.target.getAttribute("class") === "svgPie--path") {
      // if(!this.idData) return;
      $el(".chart__info__each").innerHTML = ``;
      $el(".chart__info__total").style.display = "block";
    }
  }

  addEvent() {
    //svgPie--path

    this.statisticCategory.addEventListener(
      "mouseover",
      this.showEachInfo.bind(this)
    );
    this.statisticCategory.addEventListener(
      "mouseout",
      this.hiddenEachInfo.bind(this)
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
    this.isData = true;
    if (transCategory.length === 0) {
      this.isData = false;
    }

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

    // info 렌더링
    $el(".chart__info__total").innerHTML = processedData.reduce((acc, cur) => {
      acc += `
        <div>
         <button class="chart__info__total--button" style="background-color: ${cur.color}"></button> ${cur.content}
        </div>
      `;
      return acc;
    }, "");

    // pie 차트 렌더링.
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
      pathEl.setAttribute("data", `${JSON.stringify(processedData[index])}`);
      svgEl.appendChild(pathEl);
    });

    // barchart 렌더링
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
          }" height="30" style="fill: ${
            cur.color
          }" class="bar__chart--${index}"}></rect>
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
    <div class="chart__info">
      <div class="chart__info__total">
      </div>
      <div class="chart__info__each">
      </div>
    </div>
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

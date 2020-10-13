import { $new, setStyle } from "../../util/dom";
import "../../public/statistic.scss";
import { NAVBAR_CHANGE } from "../../util/event";

class StatisticChart {
  constructor({ root }) {
    this.root = root;
    this.statistic = $new("div", "statistic");
    this.init();
    this.render();
  }

  subscribeNavBar(model) {
    model.subscribe(NAVBAR_CHANGE, this.show.bind(this));
  }

  show({ type }) {
    if (type === "STATISTIC") {
      setStyle(this.statistic, { display: "flex" });
    } else {
      setStyle(this.statistic, { display: "none" });
    }
  }

  init() {
    this.statistic.innerHTML = `
            <div class="statistic__header">
                <div class="statistic__header__classify">
                    <input type="radio" name="category" value="카테고리별 지출" checked="checked"/> 카테고리별 지출 <br/>
                    <input type="radio" name="category" value="일별 지출" /> 일별 지출
                </div>
                <div class ="statistic__header__expenditure">
                    <div class="statistic__header__expenditure--total">
                        이번달 지출금액 <span>444,790 원</span>
                    </div>
                    <div class="statistic__header__expenditure--day">
                        <span>이번달 일 평균 232,700 원 </span>
                    </div>
                </div>
            </div>
            <div class="statistic__chart">

            </div>


        `;
  }

  render() {
    this.root.appendChild(this.statistic);
  }
}

export default StatisticChart;

import { $new } from "../../util/dom";

class StatiticCategory {
  constructor({ root }) {
    this.root = root;
    this.statisticCategory = $new("div", "statisticCategory");
    this.init();
    this.render();
  }

  //   subscribeNavBar(model) {
  //     model.subscribe(MONTH_BUTTON_CLICK, this.test.bind(this));
  //   }

  init() {
    this.statisticCategory.innerHTML = `
        <div>
            카테고리
        </div>
    `;
  }

  render() {
    this.root.appendChild(this.statisticCategory);
  }
}

export default StatiticCategory;

import { $new, setStyle } from "../../util/dom";
import "../../public/statistic.scss";
import { NAVBAR_CHANGE } from "../../util/event";

import StatisticHeader from "./StatisticHeader";

class Statistic {
  constructor({ root }) {
    this.root = root;
    this.statistic = $new("div", "statistic");

    this.StatisticHeader = new StatisticHeader({ root: this.statistic });
    //this.statisticCategory = new StatiticCategory({root: this.statistic});
    //this.statisticDay = new StatiticDay({root: this.statistic});

    this.render();
  }

  subscribeNavBar(model) {
    model.subscribe(NAVBAR_CHANGE, this.show.bind(this));

    this.StatisticHeader.subscribeNavBar(model);
  }

  show({ type }) {
    if (type === "STATISTIC") {
      setStyle(this.statistic, { display: "flex" });
    } else {
      setStyle(this.statistic, { display: "none" });
    }
  }

  render() {
    this.root.appendChild(this.statistic);
  }
}

export default Statistic;

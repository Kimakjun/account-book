import { $el, $new, setStyle } from "../../util/dom";
import "../../public/statistic.scss";
import { NAVBAR_CHANGE } from "../../util/event";

import StatisticHeader from "./StatisticHeader";
import StatisticCategory from "./StatisticCategory";
import StatisticDay from "./StatisticDay";

class Statistic {
  constructor({ root }) {
    this.root = root;
    this.statistic = $new("div", "statistic");

    this.StatisticHeader = new StatisticHeader({ root: this.statistic });
    this.statisticCategory = new StatisticCategory({ root: this.statistic });
    this.statisticDay = new StatisticDay({ root: this.statistic });

    this.addEvent();
    this.render();
  }

  subscribeNavBar(model) {
    model.subscribe(NAVBAR_CHANGE, this.show.bind(this));

    this.StatisticHeader.subscribeNavBar(model);
    this.statisticCategory.subscribeNavBar(model);
    this.statisticDay.subscribeNavBar(model);
  }

  addEvent() {
    this.statistic.addEventListener("click", this.changeStatisticView);
  }

  changeStatisticView(e) {
    if (e.target.className === "statistic__header__classify--category") {
      setStyle($el(".statisticCategory"), { display: "flex" });
      setStyle($el(".StatiticDay"), { display: "none" });
    }
    if (e.target.className === "statistic__header__classify--day") {
      setStyle($el(".statisticCategory"), { display: "none" });
      setStyle($el(".StatiticDay"), { display: "flex" });
    }
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

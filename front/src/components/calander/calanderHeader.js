import { MoneySelectBoxTemplate } from "../../template/MoneySelecBoxTemplate";
import { $new } from "../../util/dom";
import { MONEY_SELECT_BOX_CLICK, MONTH_BUTTON_CLICK } from "../../util/event";

class CalanderHeader {
  constructor({ root }) {
    this.root = root;
    this.calanderHeader = $new("div", "calanderHeader");
    this.calanderHeader.innerText = `calander header 입니다.`;
    this.init();
    this.render();
  }

  subscribeHistory(model) {
    model.subscribe(MONEY_SELECT_BOX_CLICK, this.updateView.bind(this));
  }
  subscribeNavbar(model) {
    model.subscribe(MONTH_BUTTON_CLICK, this.updateView.bind(this));
  }

  updateView({ trans, type }) {
    this.calanderHeader.innerHTML = MoneySelectBoxTemplate({ trans, type });
  }

  init() {
    this.calanderHeader.innerHTML = MoneySelectBoxTemplate({});
  }

  render() {
    this.root.appendChild(this.calanderHeader);
  }
}

export default CalanderHeader;

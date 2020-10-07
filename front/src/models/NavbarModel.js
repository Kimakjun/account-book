import { $el } from "../util/dom";
import Observable from "./Observable";

class NavbarModel extends Observable {
  constructor() {
    super();
    this.month = "";
    this.trans = [];
    this.init();
  }

  init() {
    this.leftButtonClick();
    this.rightButtonClick();
    this.showTransaction();
    this.month = this.getInitMonth();
  }

  getInitMonth() {
    return new Date().getMonth() + 1;
  }

  leftButtonClick() {
    const leftButton = $el(".left");
    leftButton.addEventListener("click", () => {
      this.month = this.month - 1 === 0 ? 12 : this.month - 1;
      this.notify("buttonClick", this.month);
    });
  }

  rightButtonClick() {
    const leftButton = $el(".right");
    leftButton.addEventListener("click", () => {
      this.month = this.month + 1 == 13 ? 1 : this.month + 1;
      this.notify("buttonClick", this.month);
    });
  }

  showTransaction() {}
}

export default NavbarModel;

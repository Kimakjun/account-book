import { $el, $new } from "../util/dom";
import "../public/navbar.scss";
import { navBarTemplate } from "../template/navbarTemplate";
import { MONTH_BUTTON_CLICK } from "../util/event";

class Navbar {
  constructor({ root }) {
    this.root = root;
    this.navbar = $new("div", "navbar");
    this.init();
    this.render();
  }

  subscribe(model) {
    model.subscribe(MONTH_BUTTON_CLICK, this.buttonUpdate.bind(this));
  }

  buttonUpdate({ month }) {
    $el(".navbar__monthSelector--month").innerText = `${month}월`;
  }

  getInitMonth() {
    return new Date().getMonth();
  }

  init() {
    const month = this.getInitMonth() + 1;
    this.navbar.innerHTML = navBarTemplate(month);
  }

  render() {
    this.root.appendChild(this.navbar);
  }
}

export default Navbar;

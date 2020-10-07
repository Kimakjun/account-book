import { $el, $new } from "../util/dom";
import "../public/navbar.scss";
import navbarModel from "../models/NavbarModel";
import { navBarTemplate } from "../template/navbarTemplate";

class Navbar {
  constructor({ root }) {
    this.root = root;
    this.navbar = $new("div", "navbar");
    this.init();
    this.render();
    this.subscribe();
  }

  subscribe() {
    this.model = new navbarModel();
    this.model.subscribe("buttonClick", this.buttonUpdate.bind(this));
  }

  buttonUpdate(data) {
    $el(".navbar__monthSelector--month").innerText = `${data}월`;
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

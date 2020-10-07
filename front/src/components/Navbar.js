import { $new } from "../util/dom";
import "../public/navbar.scss";
import navbarModel from "../models/NavbarModel";

class Navbar {
  constructor({ root }) {
    this.root = root;
    this.model = navbarModel;
    this.navbar = $new("div", "navbar");
    this.init();
    this.render();
  }

  getInitMonth() {
    this.date = new Date();
  }

  init() {
    this.navbar.innerHTML = `
            <div class="navbar__monthSelector">
                <button class="navbar__monthSelector--button">◀</button>
                <span class="navbar__monthSelector--month">10월</span>
                <button class="navbar__monthSelector--button">▶</button>
            </div>
            <div class="navbar__contentSelector">
                <div class="navbar__contentSelctor--history">내역</div>
                <div class="navbar__contentSelctor--clander">달력</div>
                <div class="navbar__contentSelctor--analysis">통계</div>
            </div>
        `;

    this.model.subscribe("leftClickButton", () => {
      console.log("test");
    });
  }

  render() {
    this.root.appendChild(this.navbar);
  }
}

export default Navbar;

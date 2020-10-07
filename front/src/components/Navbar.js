import { $new } from "../util/dom";
import "../public/navbar.scss";

class Navbar {
  constructor({ root }) {
    this.root = root;
    this.navbar = $new("div", "navbar");
    this.init();
    this.render();
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
  }

  render() {
    this.root.appendChild(this.navbar);
  }
}

export default Navbar;

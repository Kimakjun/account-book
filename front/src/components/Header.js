import { $el, $new } from "../util/dom";
import "../public/header.scss";
import { getData } from "../util/api";
import { linkTo } from "../util/link";
import { headerTemplate } from "../template/headerTemplate";

class Header {
  constructor({ root }) {
    this.root = root;
    this.header = $new("div", "header");
    this.user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    this.init();
    this.render();
    this.addEvent();
  }

  init() {
    this.header.innerHTML = headerTemplate(this.user.nick);
  }

  addEvent() {
    $el(".auth__logout")?.addEventListener("click", this.logout); // ? 있으면 진행
  }

  async logout() {
    await getData("/auth/logout")
      .then((res) => {
        if (res.data.success) {
          localStorage.clear();
          linkTo("");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    this.root.appendChild(this.header);
  }
}

export default Header;

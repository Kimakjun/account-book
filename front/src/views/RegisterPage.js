import { $el, $new } from "../util/dom";
import { linkTo } from "../util/link";
import "../public/login.scss";
import { registerTemplate } from "../template/registerTemplate";
import "../public/login.scss";

class RegisterPage {
  constructor({ root }) {
    this.root = root;
    this.loginContainer = $new("div", "loginContainer");
    this.inputState = { email: "", password: "" };
    this.init();
    this.render();
    this.addEvent();
  }

  init() {
    this.loginContainer.innerHTML = registerTemplate();
  }

  addEvent() {
    $el("#goToLogin").addEventListener("click", this.goToRegister);
  }

  goToRegister() {
    linkTo("");
  }

  render() {
    this.root.appendChild(this.loginContainer);
  }
}

export default RegisterPage;

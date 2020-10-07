import { $el, $new } from "../util/dom";
import { linkTo } from "../util/link";
import "../public/login.scss";
import { registerTemplate } from "../template/registerTemplate";
import "../public/login.scss";
import { postData } from "../util/api";
import { isEmail, isNick, isPassword } from "../../../back/src/util/validator";

class RegisterPage {
  constructor({ root }) {
    this.root = root;
    this.loginContainer = $new("div", "loginContainer");
    this.inputState = { email: "", password: "", nick: "" };
    this.init();
    this.render();
    this.addEvent();
  }

  init() {
    this.loginContainer.innerHTML = registerTemplate();
  }

  addEvent() {
    $el("#registerButton").addEventListener("click", this.register.bind(this));
    $el("#goToLogin").addEventListener("click", this.goToRegister);
    $el(".registerForm").addEventListener("input", this.updateInput.bind(this));
  }

  register() {
    if (
      !isEmail(this.inputState.email) ||
      !isPassword(this.inputState.password) ||
      !isNick(this.inputState.nick)
    ) {
      return alert("invaild inputs");
    }

    postData("/auth/register", this.inputState)
      .then((res) => {
        if (res.data.success) {
          alert("회원가입 성공 로그인페이지로 이동합니다.");
          linkTo("");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }

  updateInput(e) {
    const { name } = e.target;
    if (name === "email")
      this.inputState = { ...this.inputState, email: $el(`#${name}`).value };
    if (name === "password")
      this.inputState = { ...this.inputState, password: $el(`#${name}`).value };
    if (name === "nick")
      this.inputState = { ...this.inputState, nick: $el(`#${name}`).value };
  }

  goToRegister() {
    linkTo("");
  }

  render() {
    this.root.appendChild(this.loginContainer);
  }
}

export default RegisterPage;

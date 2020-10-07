import { $el, $new } from "../util/dom";
import { linkTo } from "../util/link";
import { loginTemplate } from "../template/loginTemplate";
import { isEmail, isPassword } from "../util/vailidator";
import { getData, postData } from "../util/api";
import "../public/login.scss";

class LoginPage {
  constructor({ root }) {
    this.root = root;
    this.loginContainer = $new("div", "loginContainer");
    this.inputState = { email: "", password: "" };
    this.init();
    this.render();
    this.addEvent();
  }

  init() {
    this.loginContainer.innerHTML = loginTemplate();
  }

  addEvent() {
    $el("#goToRegister").addEventListener("click", this.goToRegister);
    $el("#localLoginButton").addEventListener(
      "click",
      this.localLogin.bind(this)
    );
    $el("#kakaoLoginButton").addEventListener("click", this.kakaoLogin);
    $el(".loginForm").addEventListener("input", this.updateInput.bind(this));
  }

  goToRegister() {
    linkTo("register");
  }

  async localLogin() {
    console.log(this.inputState);
    if (
      !isEmail(this.inputState.email) ||
      !isPassword(this.inputState.password)
    )
      return alert("invaild input");
    await postData("/auth/login", this.inputState)
      .then((res) => {
        if (res.data.success) linkTo("main");
        else alert(`${res.data.message}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async kakaoLogin() {
    console.log("test");
    const data = await getData("/auth/kakao");
    console.log(data);
  }

  updateInput(e) {
    const { name } = e.target;
    console.log(name);
    if (name === "email")
      this.inputState = { ...this.inputState, email: $el(`#${name}`).value };
    if (name === "password")
      this.inputState = { ...this.inputState, password: $el(`#${name}`).value };
  }

  render() {
    this.root.appendChild(this.loginContainer);
  }
}

export default LoginPage;

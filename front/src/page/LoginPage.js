// 오로지 인터페이스만 다룸~!
class LoginPage {
  constructor({ root, test }) {
    this.root = root;
    this.test = test;
    this.LoginContainer = document.createElement("div");
    this.init();
  }

  init() {
    const button = document.createElement("button");
    button.innerText = "register";
    button.addEventListener("click", () => {
      history.pushState({ page: "register" }, "register", "/#register");
      location.reload();
    });
    this.root.appendChild(button);
  }
}

module.exports = LoginPage;

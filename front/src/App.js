import "./index.scss";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import RegisterPage from "./page/RegisterPage";

export class App {
  constructor(root) {
    this.root = root;
    this.user;
    this.urlHash = "/" + location.hash.replace("#", "");
    this.init();
    this.routing(this.urlHash);
  }

  init() {
    window.addEventListener("popstate", () => {
      location.reload();
    });
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  routing(path) {
    this.root.innerHTML = "";
    if (path == "/main" && !this.user.nick) path = "/";

    switch (path) {
      case "/":
        new LoginPage({ root: this.root });
        break;
      case "/main":
        new MainPage({ root: this.root });
        break;
      case "/register":
        new RegisterPage({ root: this.root });
        break;
    }
  }
}

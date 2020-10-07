import "./index.scss";
import LoginPage from "./views/LoginPage";
import MainPage from "./views/MainPage";
import RegisterPage from "./views/RegisterPage";

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
    if (path == "/main" && !this.user) path = "/";
    if (path != "/main" && this.user) path = "/main";

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

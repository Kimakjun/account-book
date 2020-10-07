import "./index.scss";
import { getData } from "./util/api";
import LoginPage from "./views/LoginPage";
import MainPage from "./views/MainPage";
import RegisterPage from "./views/RegisterPage";

export class App {
  constructor(root) {
    this.root = root;
    this.user;
    this.urlHash = "/" + location.hash.replace("#", "");
    this.init();
  }

  async init() {
    window.addEventListener("popstate", () => {
      location.reload();
    });
    if (!this.user) {
      getData("/auth/userData")
        .then((res) => {
          if (res.data.success && res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.user = res.data.user;
          }
          this.routing(this.urlHash);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.routing(this.urlHash);
    }
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

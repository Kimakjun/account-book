import { $new, $el } from "../util/dom";
import { getData } from "../util/api";
import { linkTo } from "../util/link";
class MainPage {
  constructor({ root }) {
    const div = document.createElement("div");
    div.innerText = "메인 페이지 입니다.";
    const button = $new("button", "logout");
    button.innerText = "logout";

    root.appendChild(div);
    root.appendChild(button);

    $el(".logout").addEventListener("click", () => {
      getData("/auth/logout")
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            localStorage.clear();
            linkTo("");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
}

export default MainPage;

import "./index.scss";
import axios from "axios";

export class App {
  constructor(root) {
    const div = document.createElement("div");
    div.innerHTML = `<div>hello front</div>`;
    root.appendChild(div);
    axios.get("http://localhost:8005/api/v1/auth/logout");
  }

  // 라우팅..!
}

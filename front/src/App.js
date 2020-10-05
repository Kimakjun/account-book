import "./index.scss";

export class App {
  constructor(root) {
    const div = document.createElement("div");
    div.innerHTML = `<div>hello</div>`;
    root.appendChild(div);
  }
}

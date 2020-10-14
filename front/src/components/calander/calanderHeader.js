import { $new } from "../../util/dom";

class CalanderHeader {
  constructor({ root }) {
    this.root = root;
    this.calanderHeader = $new("div", "calanderHeader");
    this.calanderHeader.innerText = `calander header 입니다.`;
    this.render();
  }

  render() {
    this.root.appendChild(this.calanderHeader);
  }
}

export default CalanderHeader;

import { $new, setStyle } from "../../util/dom";
import { NAVBAR_CHANGE } from "../../util/event";
import CalanderHeader from "./calanderHeader";
import "../../public/calander.scss";
import CalanderBody from "./calanderBody";
class Calander {
  constructor({ root }) {
    this.root = root;
    this.Calander = $new("div", "calander");
    this.CalanderHeader = new CalanderHeader({ root: this.Calander });
    this.CalanderBody = new CalanderBody({ root: this.Calander });
    this.render();
  }

  subscribeNavBar(model) {
    model.subscribe(NAVBAR_CHANGE, this.show.bind(this));
    this.CalanderHeader.subscribeNavbar(model);
    this.CalanderBody.subscribeNavBar(model);
  }

  subscribeHistory(model) {
    this.CalanderHeader.subscribeHistory(model);
    this.CalanderBody.subscribeHistory(model);
  }

  show({ type }) {
    if (type === "CALANDER") {
      setStyle(this.Calander, { display: "flex" });
    } else {
      setStyle(this.Calander, { display: "none" });
    }
  }

  render() {
    this.root.appendChild(this.Calander);
    console.log(this.root);
  }
}

export default Calander;

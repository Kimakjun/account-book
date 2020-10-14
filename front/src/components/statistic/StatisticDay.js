import { $new } from "../../util/dom";

class StatiticDay {
  constructor({ root }) {
    this.root = root;
    this.StatiticDay = $new("div", "StatiticDay");
    this.init();
    this.render();
  }

  init() {
    this.StatiticDay.innerHTML = `
        <div>
            일별 통계 데이터 그릴거임
        </div>
    `;
  }

  render() {
    this.root.appendChild(this.StatiticDay);
  }
}

export default StatiticDay;

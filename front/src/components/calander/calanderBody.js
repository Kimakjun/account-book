import { $el, $new } from "../../util/dom";
import { MONTH_BUTTON_CLICK } from "../../util/event";
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYNAME = ["일", "월", "화", "수", "목", "금", "토"];

class CalanderBody {
  constructor({ root }) {
    this.root = root;
    this.calanderbody = $new("div", "calanderBody");
    this.init();
    this.render();
  }

  subscribeNavBar(model) {
    model.subscribe(MONTH_BUTTON_CLICK, this.updateView.bind(this));
  }

  isWeekend(month, day) {
    return new Date(`2020-${month}-${day}`).getDay() === 0;
  }

  isToday(month, day) {
    return new Date().getMonth() + 1 === month && new Date().getDate() === day;
  }

  updateView({ month, transDayCalander }) {
    this.calanderbody.innerHTML = "";
    this.drawCalander(month);
    this.drawTran(transDayCalander);
  }

  getDayElement(isIncome, day) {
    if (isIncome) return $el(`.day-income-${day}`);
    else return $el(`.day-expenditure-${day}`);
  }

  getDate(rowDate) {
    return new Date(rowDate).getDate();
  }

  drawTran(transDayCalander) {
    console.log(transDayCalander);
    transDayCalander.forEach((tran) => {
      const targetEl = this.getDayElement(
        tran.isIncome,
        this.getDate(tran.createdAt)
      );
      targetEl.innerText =
        (tran.isIncome ? "+" : "-") + `${tran.total_amount}원`;
    });
  }

  drawCalander(month) {
    const preMonthLastDay = DAYS[month - 2] < 0 ? DAYS[11] : DAYS[month - 2];
    const temp =
      new Date(
        `2020-${month - 1 === 0 ? 12 : month - 1}-${preMonthLastDay}`
      ).getDay() % 6;
    const preMonthStartDay =
      temp === 0 ? preMonthLastDay + 1 : preMonthLastDay - temp;

    let dayArr = [];
    const curTotalDays = DAYS[month - 1];
    const preArr = Array.from(
      { length: preMonthLastDay - preMonthStartDay + 1 },
      (v, i) => i + preMonthStartDay
    );
    const preArrtoObject = preArr.map((cur) => ({
      day: cur,
      isCurMonth: false,
    }));
    const curArr = Array.from({ length: curTotalDays }, (v, i) => i + 1);
    const curArrtoObject = curArr.map((cur) => ({
      day: cur,
      isCurMonth: true,
    }));

    dayArr = [...preArrtoObject, ...curArrtoObject];

    for (let day = 1; day <= 7; day++) {
      this.calanderbody.innerHTML += `
            <div class="dayString">${DAYNAME[day - 1]}</div>
    `;
    }

    this.calanderbody.innerHTML += dayArr.reduce((acc, cur) => {
      acc += `
            <div class="day ${
              cur.isCurMonth && this.isWeekend(month, cur.day) ? "weekend" : ""
            } 
                            ${cur.isCurMonth ? "curMonth" : "preMonth"}
                            ${
                              cur.isCurMonth && this.isToday(month, cur.day)
                                ? "today"
                                : ""
                            }
                "><div>
                ${cur.day}
                  </div>
                  ${
                    cur.isCurMonth
                      ? `
                    <div class="day-income-${cur.day} income">
                    </div>
                    <div class="day-expenditure-${cur.day} expenditure">
                    </div> 
                  `
                      : ""
                  }
                </div>
        `;
      return acc;
    }, "");
  }

  init() {
    // 받아야하는 정보 현재 달정보
  }

  render() {
    this.root.appendChild(this.calanderbody);
  }
}

export default CalanderBody;

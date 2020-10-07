import Header from "../components/Header";
import NabVar from "../components/Navbar";

class MainPage {
  constructor({ root }) {
    new Header({ root });
    new NabVar({ root });
    // 가계부 => 입력영역, 조회역영
    // 달력
    // 날짜통계표
  }
}

export default MainPage;

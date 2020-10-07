import Header from "../components/Header";
import NabVar from "../components/Navbar";
import TranInput from "../components/TransactionFrom";

class MainPage {
  constructor({ root }) {
    new Header({ root });
    new NabVar({ root });
    new TranInput({ root });
    // 가계부 => 입력영역, 조회역영
    // 달력
    // 날짜통계표
  }
}

export default MainPage;

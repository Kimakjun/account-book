import Calander from "../components/calander/calander";
import Header from "../components/Header";
import Modal from "../components/Modal";
import NabVar from "../components/Navbar";
import Statistic from "../components/statistic/Statistic";
import TranInput from "../components/TransactionFrom";
import TranHistory from "../components/Transactionhitory";
import ModalModel from "../models/modalModel";
import NavbarModel from "../models/NavbarModel";
import TranHistoryModel from "../models/tranHistoryModel";
import TranInputModel from "../models/TranInputModel";
import States from "../states/states";

class MainPage {
  constructor({ root }) {
    this.root = root;
    this.init();
  }

  init() {
    // 거래내역 컴포넌트
    new Header({ root: this.root });
    const modal = new Modal({ root: this.root });
    const navbar = new NabVar({ root: this.root });

    // 거래내역화면
    const tranInput = new TranInput({ root: this.root });
    const tranHistory = new TranHistory({ root: this.root });

    // 통계화면.
    const statistic = new Statistic({ root: this.root });

    //달력화면.
    const calander = new Calander({ root: this.root });

    // 상태공유.
    const state = new States();
    state.useState("category", "");
    state.useState("payment", "");
    state.useState("trans", "");
    state.useState("selectType", { income: true, expenditure: true });
    state.useState("tranMode", "생성");
    state.useState("averageExpenditure", "");
    state.useState("month", "");

    // 구독
    const modalModal = new ModalModel({ state });
    modal.subscribeModal(modalModal);
    tranInput.subscribeModal(modalModal);

    const navbarModel = new NavbarModel({ state });
    navbar.subscribeNavBar(navbarModel);
    tranHistory.subscribeNavBar(navbarModel);
    statistic.subscribeNavBar(navbarModel);
    tranInput.subscribeNavBar(navbarModel);
    calander.subscribeNavBar(navbarModel);

    const historyModel = new TranHistoryModel({ state });
    tranHistory.subscribeHistory(historyModel);
    tranInput.subscribeHistory(historyModel);
    calander.subscribeHistory(historyModel);

    const tranInputModel = new TranInputModel({ state });
    tranInput.subscribeTranInput(tranInputModel);
    tranHistory.subscribeTranInput(tranInputModel);
  }
}

export default MainPage;

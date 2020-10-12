import Header from "../components/Header";
import Modal from "../components/Modal";
import NabVar from "../components/Navbar";
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
    //상태!
    new Header({ root: this.root });
    const modal = new Modal({ root: this.root });
    const navbar = new NabVar({ root: this.root });
    const tranInput = new TranInput({ root: this.root });
    const tranHistory = new TranHistory({ root: this.root });

    const state = new States();
    state.useState("category", "");
    state.useState("payment", "");
    state.useState("trans", "");
    state.useState("selectType", { income: true, expenditure: true });
    state.useState("tranMode", "생성");

    const modalModal = new ModalModel({ state });
    modal.subscribeModal(modalModal);
    tranInput.subscribeModal(modalModal);

    const navbarModel = new NavbarModel({ state });
    navbar.subscribeNavBar(navbarModel);
    tranHistory.subscribeNavBar(navbarModel);

    const historyModel = new TranHistoryModel({ state });
    tranHistory.subscribeHistory(historyModel);
    tranInput.subscribeHistory(historyModel);

    const tranInputModel = new TranInputModel({ state });
    tranInput.subscribeTranInput(tranInputModel);
    tranHistory.subscribeTranInput(tranInputModel);
  }
}

export default MainPage;

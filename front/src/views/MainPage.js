import Header from "../components/Header";
import Modal from "../components/Modal";
import NabVar from "../components/Navbar";
import TranInput from "../components/TransactionFrom";
import TranHistory from "../components/Transactionhitory";
import NavbarModel from "../models/NavbarModel";

class MainPage {
  constructor({ root }) {
    this.root = root;
    this.init();
  }

  init() {
    new Header({ root: this.root });
    const modal = new Modal({ root: this.root });
    const navbar = new NabVar({ root: this.root });
    const tranInput = new TranInput({ root: this.root });
    const tranHistory = new TranHistory({ root: this.root });

    // TODO: 돔다그리고 이벤트 달아야함..!

    const navbarModel = new NavbarModel();
    modal.subscribe(navbarModel);
    navbar.subscribe(navbarModel);
    tranHistory.subscribe(navbarModel);
    tranInput.subscribe(navbarModel);
  }
}

export default MainPage;

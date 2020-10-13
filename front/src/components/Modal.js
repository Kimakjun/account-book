import { $new } from "../util/dom";
import "../public/modal.scss";
import { MANAGEMENT_MADAL_OPEN, MONEY_MANAGEMENT_CHANGE } from "../util/event";

class Modal {
  constructor({ root }) {
    this.root = root;
    this.ModalContainer = $new("div", "modal");
    this.render();
  }

  subscribeModal(model) {
    model.subscribe(MANAGEMENT_MADAL_OPEN, this.drwaModal.bind(this));
    model.subscribe(MONEY_MANAGEMENT_CHANGE, this.drwaModal.bind(this));
  }

  drwaModal({ datas, type }) {
    this.ModalContainer.innerHTML = `
            <div class="modal__wrapper">
                <div class ="modal__header">
                    <span class="modal__header--title">${type} 관리</span>
                    <button class="modal__header--delete">X</button>
                </div>
                <div class="modal__inputContent">
                    <span>${type} 이름</span>
                    <input class="modal__inputContent--input" name=${type} />
                    <button class="modal__inputContent--button" data-type=${type}>
                        등록
                    </button>
                </div>
                <div class="modal__contentList">
                    ${datas?.reduce((acc, cur) => {
                      acc += `
                            <div class="modal__cotentList__content">
                                <div></div>
                                <span>${cur.content}</span>
                                <button class="modal__cotentList__content--delete" data-type=${type} id=${cur.id}>X</button>
                            </div>
                        `;
                      return acc;
                    }, "")}
                    <div class="modal__cotentList__content"></div>
                </div>
            </div>
        `;
  }

  render() {
    this.root.appendChild(this.ModalContainer);
  }
}

// 헤더에서 버튼누루면 모델에서 어느 버튼눌렸는지 판단하고
// 모달 비지블하게하고 모달에 맞는 데이서

export default Modal;

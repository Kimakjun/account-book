class MainPage {
  constructor({ root }) {
    const div = document.createElement("div");
    div.innerText = "메인 페이지 입니다.";
    root.appendChild(div);
  }
}

export default MainPage;

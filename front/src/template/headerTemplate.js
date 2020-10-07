export const headerTemplate = (userNick) => {
  return `
        <div class="header__empty"></div>
        <div class="header__title">
            <div class=""title>가게부</div>
        </div>
        <div class="header__content">
            <div class="header__auth">
                ${
                  userNick
                    ? `<sapn>안녕하세요! ${userNick}님</span>
                    <button class="auth__logout">로그아웃</button>`
                    : ""
                }
            </div>
            <div class="header__util">
                ${
                  userNick
                    ? `<button class="util__category">카테고리 관리</button>
                    <button class="util__payment">결제수단 관리</button>`
                    : ""
                }
            </div> 
        </div>
  `;
};

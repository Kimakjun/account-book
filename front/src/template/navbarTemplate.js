export const navBarTemplate = (date) => {
  return `
    <div class="navbar__monthSelector">
        <button class="navbar__monthSelector--button left">◀</button>
        <span class="navbar__monthSelector--month">${date}월</span>
        <button class="navbar__monthSelector--button right">▶</button>
    </div>
    <div class="navbar__contentSelector">
        <div class="navbar__contentSelctor--history">내역</div>
        <div class="navbar__contentSelctor--clander">달력</div>
        <div class="navbar__contentSelctor--analysis">통계</div>
    </div>
  `;
};

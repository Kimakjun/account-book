export const MoneySelectBoxTemplate = ({ trans, type }) => {
  let totalIncome = 0,
    totalExpenditure = 0;
  if (!type) type = { income: true, expenditure: true };
  trans?.forEach((tran) => {
    if (tran.isIncome) totalIncome += tran.amount;
    else totalExpenditure += tran.amount;
  });
  return `
      <div class="tranHistory_header__income">
        <input class="tranHistory_header--income" name="checkbox" type="checkbox" value="수입" ${
          type.income ? `checked` : ``
        }/>
        <span>수입 ${Number(totalIncome).toLocaleString("en")} 원</span>
      </div>
      <div class="tranHistory_header__expenditure">
        <input class="tranHistory_header--expenditure" name="checkbox" type="checkbox" value="지출" ${
          type.expenditure ? `checked` : ``
        }/> 
        <span>지출 ${Number(totalExpenditure).toLocaleString("en")} 원</span>
      </div> 
      `;
};

// 'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    const initCategoryDatas = [
      {
        content: '월급',
        isIncome: "수입",
        isInit: true,
      },
      {
        content: '용돈',
        isIncome: "수입",
        isInit: true,
      },
      {
        content: '식비',
        isIncome: "수입",
        isInit: true,
      },
      {
        content: '생활',
        isIncome: "지출",
        isInit: true,
      },
      {
        content: '쇼핑/뷰티',
        isIncome: "지출",
        isInit: true,
      },
      {
        content: '교통',
        isIncome: "지출",
        isInit: true,
      },
      {
        content: '의료/건강',
        isIncome: "지출",
        isInit: true,
      },
      {
        content: '문화/여가',
        isIncome: "지출",
        isInit: true,
      },
      {
        content: '미분류',
        isIncome: "지출",
        isInit: true,
      }
    ];
    
    await Promise.all(initCategoryDatas.map((data)=> 
      queryInterface.bulkInsert('categories', [{
        content: data.content,
        isIncome: data.isIncome,
        isInit: data.isInit,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ))
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

const {Transaction, Payment, Category, sequelize} = require('../models');
const {Op} = require('sequelize');

exports.getTransaction = async(req, res, next) => {

        const {date} = req.params; // 2020-09
        // TODO: where 조건 추가, req.user.id 현재로그인한 사용자정보
        const min = new Date(date);
        const max = new Date(date);
        max.setMonth(min.getMonth() + 1);
        const result = await Transaction.findAll({
            where: {
                createdAt: {  [Op.gt]: min, 
                              [Op.lt]: max      
                }},
            include: [{
                model: Payment,
                attributes: ['id', 'content']
            },{
                model: Category,
                attributes: ['id','content']
            }],
            order: [[sequelize.literal('createdAt'), 'DESC']],
        });

        return res.json({success: true, data: result});

};

exports.addTransaction = async(req, res, next) => {

    const {amount, content, date, isIncome, paymentId, categoryId} = req.body;
    await Transaction.create({
        amount,
        content,
        isIncome,
        paymentId,
        categoryId,
        userId: req.user.id,
        createdAt: date
    })

    res.json({success: true, message: 'transaction create'});
};

exports.updateTransaction = async(req, res, next) => {
    const {id} = req.params;
    const {amount, content, date, isIncome, paymentId, categoryId} = req.body;
    await Transaction.update({
        amount,
        content,
        isIncome,
        paymentId,
        categoryId,
        userId: req.user.id,
        createdAt: date},
        {
            where: {id}
        });
    res.json({success: true, message: 'update success'});
};

exports.deleteTransaction = async(req, res, next) => {
    const {id} = req.params;
    await Transaction.destroy({where: {id}});
    res.json({success: true, message: 'delete success'});
};

exports.getTransactionByCategory = async(req, res, next) => {
   
    const {date} = req.params;  
    const min = new Date(date);
    const max = new Date(date);
    max.setMonth(min.getMonth() + 1);

    const result = await Transaction.findAll({
        attributes: [
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
        ],
        order: [[sequelize.literal('total_amount'), 'DESC']],
        include: [
            {
                model: Category      
            }
        ],
        group: ['categoryId'],
        where: {
            isIncome: false,
            createdAt: {  [Op.gt]: min, 
                          [Op.lt]: max      
        }
        }
    })
    res.json({success: true, data: result});
}

exports.getTransactionByExpenditure = async(req, res, next) => {
    
    const {date} = req.params;
    const {type} = req.params;
    
    const min = new Date(date);
    const max = new Date(date);
    max.setMonth(min.getMonth() + 1);

    const result = await Transaction.findAll({
        attributes: [
            'createdAt',
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
        ],
        group: [sequelize.fn('DAY', sequelize.col('createdAt')),
        ],
        where: {
                    isIncome: type,
                    createdAt: {  [Op.gt]: min, 
                                  [Op.lt]: max      }
        }
        
    })
    res.json({success: true, data: result});

}

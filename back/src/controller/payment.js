const { Payment, User } = require("../models")

exports.getPayments = async(req, res, next) => {
    const user = await User.findOne({where: {id: req.user.id}});
    const payments = await user.getPayments();
    res.status(200).json({success: true, data : payments});
}

exports.addPayment = async(req, res, next) => {
    const {content} = req.body;
    const payment = 0;
    const result = await Payment.findOrCreate({where: {content}});
    await result[payment].addUser(req.user.id);
    res.status(200).json({success: true, message: 'patment created'});   
}

exports.deletePayment = async(req, res, next) => {
    const {id} = req.params;
    const payment = await Payment.findOne({where: {id}});
    await payment.removeUser(req.user.id);
    res.status(200).json({success: true, message: 'destory success'});
}
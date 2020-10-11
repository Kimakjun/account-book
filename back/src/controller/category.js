const { Category, User } = require("../models")


exports.getCategories = async(req, res, next) => {
    const user = await User.findOne({where: {id: req.user.id}});
    const categories = await user.getCategories();
    res.status(200).json({success: true, data : categories});
}

exports.addCategories = async(req, res, next) => {
    const {content, isIncome} = req.body;
    const category = 0;
    const result = await Category.findOrCreate({where: {content, isIncome}});
    console.log(result);
    await result[category].addUser(req.user.id);
    res.status(200).json({success: true, message: 'category created'});   
}

exports.deleteCategories = async(req, res, next) => {
    const {id} = req.params;
    const category = await Category.findOne({where: {id}});
    await category.removeUser(req.user.id);
    res.status(200).json({success: true, message: 'destory success'});
}
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Transaction = require('./transaction')(sequelize, Sequelize);
db.Payment = require('./payment')(sequelize, Sequelize);

db.User.hasMany(db.Transaction);
db.Transaction.belongsTo(db.User);

db.Transaction.belongsTo(db.Category);
db.Transaction.belongsTo(db.Payment);

db.User.belongsToMany(db.Payment, {through: 'UserPayment'});
db.Payment.belongsToMany(db.User, {through: 'UserPayment'});

db.User.belongsToMany(db.Category, {through: 'UserCategory'});
db.Category.belongsToMany(db.User, {through: 'UserCategory'});



module.exports = db;


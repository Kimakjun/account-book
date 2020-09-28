const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Transaction = require('./payment')(sequelize, Sequelize);
db.Payment = require('./transaction')(sequelize, Sequelize);

db.User.hasMany(db.Transaction);
db.Transaction.belongsTo(db.User);

db.Category.belongsTo(db.Transaction);
db.Transaction.hasOne(db.Category);

db.Payment.belongsTo(db.Transaction);
db.Transaction.hasOne(db.Payment);

db.User.belongsToMany(db.Payment, {through: 'UserPayment'});
db.Payment.belongsToMany(db.User, {through: 'UserPayment'});

db.User.belongsToMany(db.Category, {through: 'UserCategory'});
db.Category.belongsToMany(db.User, {through: 'UserCategory'});



module.exports = db;


module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('payment', {
        content : {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        timestamps: true,
        paranoid: true
    })
}
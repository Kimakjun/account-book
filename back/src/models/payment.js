module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('payment', {
        content : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        isInit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        timestamps: true,
        paranoid: true
    })
}
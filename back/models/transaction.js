module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('transaction', {
        amount : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        isIncome: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        timestamps: true,
        paranoid: true
    })
}
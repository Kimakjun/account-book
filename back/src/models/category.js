module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('category', {
        content : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        isIncome : {
            type : DataTypes.STRING(100),
            alowNull: false,
        }
    }, {
        timestamps: true,
        paranoid: true
    })
}
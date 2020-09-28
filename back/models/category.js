module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('category', {
        content : {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        timestamps: true,
        paranoid: true
    })
}
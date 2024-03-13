module.exports = (sequelize, DataTypes) => {

    const Trade = sequelize.define('Trade', {
        trade_type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return Trade;
}
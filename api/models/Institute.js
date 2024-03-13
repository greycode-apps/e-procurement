module.exports = (sequelize, DataTypes) => {

    const Institute = sequelize.define('Institute', {
        org_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: true
        }

    });

    Institute.associate = (models) => {
        Institute.belongsTo(models.User, {foreignKey: 'userId'}),
        Institute.hasMany(models.Bid, {foreignKey: "ownerId"})
    }

    return Institute;
}
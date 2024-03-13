module.exports = (sequelize, DataTypes) => {

    const Request = sequelize.define("Request", {
        send_to: { // Org holding bid
            type: DataTypes.STRING,
            allowNull: false
        },
        desc: { // shot notes || qoute
            type: DataTypes.TEXT,
            allowNull: true
        },
        budget: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false
        },
        is_accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        qoute: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Request.associate = (models) => {
        Request.belongsTo(models.Supplier, {foreignKey: "supplierId"}),
        Request.belongsTo(models.Bid, {foreignKey: "bidId"})
    }

    return Request;
}
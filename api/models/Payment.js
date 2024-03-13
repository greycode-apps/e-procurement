module.exports = (sequelize, DataTypes) => {

    const Payment = sequelize.define("Payment", {
        trade_type: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
        }, 
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: () => {
                const currentDate = new Date();
                const oneYearFromNow = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
                return oneYearFromNow;
            }
        }
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.Supplier, {foreignKey: "supplierId"})
    }

    return Payment;
}
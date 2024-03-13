module.exports = (sequelize, DataTypes) => {

    const Supplier = sequelize.define('Supplier', {
        org_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        tax_no: { 
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        trade_type: { // The type of commodity user is allowed to supply
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Supplier.associate = (models) => {
        Supplier.belongsTo(models.User, {foreignKey: 'userId'}),
        Supplier.hasMany(models.Bid, {foreignKey: "acceptedFor"}),
        Supplier.hasMany(models.Request, {foreignKey: "supplierId"}),
        Supplier.hasMany(models.Payment, {foreignKey: "supplierId"})
    }

    return Supplier;
}
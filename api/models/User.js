module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        user_type: {
            type: DataTypes.ENUM('supplier', 'institute', 'admin'),
            allowNull: false,
            defaultValue: 'supplier'
        }
    });

    User.associate = (models) => {
        User.hasOne(models.Supplier, {foreignKey: 'userId'}),
        User.hasOne(models.Institute, {foreignKey: 'userId'})
    }

   

    User

    return User;

}
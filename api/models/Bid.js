module.exports = (sequelize, DataTypes) => {

    const Bid = sequelize.define('Bid', {
        budget: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: true,
        },
        desc: { // request for qoutation
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        trade_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        qoute: {
            type: DataTypes.STRING,
            allowNull: true
        },
        acceptedFor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        due_date: {
            type: DataTypes.DATE,
            validate: {
              isGreaterThanCurrentDate(value) {
                const currentDate = new Date();
                if (value < currentDate) {
                  throw new Error('Due date must be greater than the current date');
                }
              },
            },
          },
    });

    Bid.associate = (models) => {
        Bid.belongsTo(models.Institute, {foreignKey: "ownerId"}),
        Bid.hasMany(models.Request, {foreignKey: "bidId"})

    }

    return Bid;

}
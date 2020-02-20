
const usersModel = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });


    
    return User;
}


module.exports = usersModel

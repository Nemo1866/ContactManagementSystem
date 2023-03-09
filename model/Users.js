const { hashSync } = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          let password = hashSync(value, 10)
          this.setDataValue("password", password)
        }
      }
    }, {
      timestamps: false
    });
  
    return User;
  };
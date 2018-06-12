const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'upinionDb',
    null,
    null,
    {
        dialect: "sqlite",
        define: { timestamps: false },
        storage: './upinionDb.sqlite',
    }
);

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

//  MODELS
const Register = sequelize.define('Register', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'Register'
});

module.exports = {
    sequelize,
    Register
}

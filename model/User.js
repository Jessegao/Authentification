var Sequelize = require('sequelize')

var attributes = {
	firstname: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: /^[a-z0-9\_\-]+$/i
		}
	},
	lastname: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: /^[a-z0-9\_\-]+$/i
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	},
	password: {
    type: Sequelize.STRING,
	},
	salt: {
    type: Sequelize.STRING
  	}
}

var options = {
	freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options
const sequelize = require('./../database/sequelize.js');
const Sequelize = require('sequelize');

module.exports = sequelize.define('note', {
	id: {
		field: 'note_id',
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		field: 'name',
		type: Sequelize.STRING,
		validate:{
			notEmpty: {
				args: true,
				msg: 'Name is required'
			}
		}
	},
	url: {
		field: 'url',
		type: Sequelize.STRING,
		validate:{
			notEmpty: {
				args: true,
				msg: 'URL is required'
			},
			isUrl: {
				args: true,
				msg: 'URL must be url address'
			}
		}
	},
	author: {
		field: 'author',
		type: Sequelize.STRING,
		validate:{
			notEmpty: {
				args: true,
				msg: 'Author is required'
			}
		}
	},
	channel: {
		field: 'channel',
		type: Sequelize.STRING,
		validate:{
			notEmpty: {
				args: true,
				msg: 'Channel is required'
			},
			isUrl: {
				args: true,
				msg: 'URL must be url address'
			},
			contains: {
				args: 'channel',
				msg: 'channel url should contain channel'
			}
		}
	},
	note: {
		field: 'note',
		type: Sequelize.STRING,
		validate:{
			notEmpty: {
				args: true,
				msg: 'Note is required'
			}
		}
	},
	userId: {
		field: 'user_id',
		type: Sequelize.STRING,
		validate:{
			notEmpty: {
				args: true,
				msg: 'User ID is required'
			}
		}
	}
}, {
	timestamps: false
});
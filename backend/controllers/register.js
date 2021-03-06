const registerModel = require('../models/register');
const error = require('../utils/error');
const _ = require('lodash');

const validCountries = ['sweden', 'denmark', 'netherlands', 'spain', 'germany', 'france', 'russia', 'belgium', 'finland'];

function create(user) {
	const errors = {};
	const data = _.pick(user, ['username', 'company', 'country']);

	if (!data.country || !_.isString(data.country)){
		errors.country = 'Country cannot be empty';
	}
	if (!data.username || !_.isString(data.username)){
		errors.username = 'Username cannot be empty';
	}
	if (!data.company || !_.isString(data.company)){
		errors.company = 'Company cannot be empty';
	}
	if (data.username && data.username.length < 5){
		errors.validUsername = 'Username is too short';
	}
	if (data.country && !_.includes(validCountries, data.country.toLowerCase())) {
		errors.validCountry = 'Not a valid country';
	}
	if (!_.isEmpty(errors)){
		throw error.createError(400, 'There are some validation issues', errors);
	}
	try {
		return registerModel.createUser(data);
	} catch (err) {
		Promise.reject(err);
	}
}

function get(timestamp) {
	const date = new Date(timestamp);
	try {
		return registerModel.getUser(date);
	} catch (err) {
		Promise.reject(err);
	}
}

module.exports = {
	create,
	get
}


/* TODO
 * Validate the request:
 * - Check that all the requested fields are present
 * - Check that the country is valid
 * If valid, call the registerModel
 * Return response { error: string, success: bool , time: timestamp } -- You cannot change this!
 */

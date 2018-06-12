const registerModel = require('../models/register');
const error = require('../utils/error');
const _ = require('lodash');

const validCountries = ['Sweden', 'Denmark', 'Netherlands', 'Spain', 'Germany'];

function create(user) {
	const errors = {}; // refactor this
	const data = _.pick(user, ['username', 'company', 'country']);

	if (!_.isString(data.country)){
		errors.country = 'must be a string';
	}
	if (!_.isString(data.username)){
		errors.username = 'must be a string';
	}
	if (!_.isString(data.company)){
		errors.company = 'must be a string';
	}
	if(!_.includes(validCountries, data.country)) {
		errors.validCountry = 'not a valid country';
	}
	if (!_.isEmpty(errors)){
		throw error.createError(403, 'There are some validation issues', errors);
	}
	try {
		return registerModel.createUser(data);
	} catch(err) {
		Promise.reject(err);
	}
}

function get(timestamp) {
	const date = new Date(timestamp);
	try {
		return registerModel.getUser(date);
	} catch(err) {
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

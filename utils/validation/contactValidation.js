/**
 * contactValidation.js
 * @description :: validate each post and put request as per contact model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of contact */
exports.schemaKeys = joi.object({
  firstName: joi.string().allow(null).allow(''),
  lastName: joi.string().allow(null).allow(''),
  address: joi.object({
    line1:joi.string().regex(/^[^\r\n]+$/),
    line2:joi.string().regex(/^[^\r\n]+$/),
    city:joi.string(),
    state:joi.string(),
    country:joi.string(),
    postalCode:joi.number().integer()
  }).allow(0),
  contactNo: joi.number().integer().allow(0),
  email: joi.string().email().allow(null).allow(''),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of contact for updation */
exports.updateSchemaKeys = joi.object({
  firstName: joi.string().allow(null).allow(''),
  lastName: joi.string().allow(null).allow(''),
  address: joi.object({
    line1:joi.string().regex(/^[^\r\n]+$/),
    line2:joi.string().regex(/^[^\r\n]+$/),
    city:joi.string(),
    state:joi.string(),
    country:joi.string(),
    postalCode:joi.number().integer()
  }).allow(0),
  contactNo: joi.number().integer().allow(0),
  email: joi.string().email().allow(null).allow(''),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of contact for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      firstName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      lastName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      contactNo: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string().email(),joi.object()),
      userId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

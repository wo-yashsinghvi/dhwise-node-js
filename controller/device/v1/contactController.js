/**
 * contactController.js
 * @description : exports action methods for contact.
 */

const Contact = require('../../../model/contact');
const contactSchemaKey = require('../../../utils/validation/contactValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Contact in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Contact. {status, message, data}
 */ 
const addContact = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      contactSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Contact(dataToCreate);
    let createdContact = await dbService.create(Contact,dataToCreate);
    return res.success({ data : createdContact });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Contact in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Contacts. {status, message, data}
 */
const bulkInsertContact = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdContacts = await dbService.create(Contact,dataToCreate);
    createdContacts = { count: createdContacts ? createdContacts.length : 0 };
    return res.success({ data:{ count:createdContacts.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Contact from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Contact(s). {status, message, data}
 */
const findAllContact = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      contactSchemaKey.findFilterKeys,
      Contact.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Contact, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundContacts = await dbService.paginate( Contact,query,options);
    if (!foundContacts || !foundContacts.data || !foundContacts.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundContacts });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Contact from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Contact. {status, message, data}
 */
const getContact = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundContact = await dbService.findOne(Contact,query, options);
    if (!foundContact){
      return res.recordNotFound();
    }
    return res.success({ data :foundContact });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Contact.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getContactCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      contactSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedContact = await dbService.count(Contact,where);
    return res.success({ data : { count: countedContact } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Contact with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Contact.
 * @return {Object} : updated Contact. {status, message, data}
 */
const updateContact = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      contactSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedContact = await dbService.updateOne(Contact,query,dataToUpdate);
    if (!updatedContact){
      return res.recordNotFound();
    }
    return res.success({ data :updatedContact });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Contact with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Contacts.
 * @return {Object} : updated Contacts. {status, message, data}
 */
const bulkUpdateContact = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedContact = await dbService.updateMany(Contact,filter,dataToUpdate);
    if (!updatedContact){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedContact } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Contact with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Contact.
 * @return {obj} : updated Contact. {status, message, data}
 */
const partialUpdateContact = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      contactSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedContact = await dbService.updateOne(Contact, query, dataToUpdate);
    if (!updatedContact) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedContact });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Contact from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Contact.
 * @return {Object} : deactivated Contact. {status, message, data}
 */
const softDeleteContact = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedContact = await dbService.updateOne(Contact, query, updateBody);
    if (!updatedContact){
      return res.recordNotFound();
    }
    return res.success({ data:updatedContact });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Contact from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Contact. {status, message, data}
 */
const deleteContact = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedContact = await dbService.deleteOne(Contact, query);
    if (!deletedContact){
      return res.recordNotFound();
    }
    return res.success({ data :deletedContact });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Contact in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyContact = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedContact = await dbService.deleteMany(Contact,query);
    if (!deletedContact){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedContact } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Contact from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Contact.
 * @return {Object} : number of deactivated documents of Contact. {status, message, data}
 */
const softDeleteManyContact = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedContact = await dbService.updateMany(Contact,query, updateBody);
    if (!updatedContact) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedContact } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addContact,
  bulkInsertContact,
  findAllContact,
  getContact,
  getContactCount,
  updateContact,
  bulkUpdateContact,
  partialUpdateContact,
  softDeleteContact,
  deleteContact,
  deleteManyContact,
  softDeleteManyContact    
};
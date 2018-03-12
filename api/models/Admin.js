/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'mysql',

  attributes: {
      id : {
  	    type : 'integer',
        primaryKey: true,
        required: true		
  	  },
  	  name : {
  	    type : 'string'
  	  },
  	  password : {
  	  	type : 'string'
  	  }



  

  }
};


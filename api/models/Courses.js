/**
 * Courses.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	connection: 'mysql',

	attributes: {

		cid : {
			type : 'string',
			primaryKey: true,
    	required: true
		},
		cname : {
			type : 'string',
    		required: true		
			},
		department : {
			type : 'string'
		},
		programme : {
			type : 'string'
		},
		startdate : {
				type : 'string'
			},
		enddate : {
				type : 'string'
			},
		applicationfee : {
				type : 'string'		
			},
		coursefee: {
				type : 'string'
			},
		duration : {
				type : 'string'
			},
		syllabus : {
			type : 'string'
		},
		eligibility: {
			type : 'string'
		},
		application:{
			type : 'string'
		},
		admission :{
			type : 'string'
		},
		link:{
			type:'string'
		}

	}
};


/**
 * CoursesController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
createcourse: function(req, res){

		var newcourse = {
			cid : req.param('cid'),
			cname :req.param('name'),
			department : req.param('department'),
			programme : 	req.param('programme'),
			startdate : req.param('startdate'),
			enddate : req.param('enddate'),
			registrationfee : req.param('regfee'),
			coursefee : req.param('coursefee'),
			duration : req.param('duration'),
			syllabus : req.param('syllabus'),
			application : req.param('application'),
			admission : req.param('admission'),
			link : req.param('link'),
			eligibility: req.param('eligibility')
			};

		Courses.create(newcourse).exec(function(err, result){
            if (err) {

                sails.log.debug('An error occured ' + err);
                return res.json(500, { error: 'Error in creating new course' });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200, { success: 'New course successfully created' });
        });
		},

updatecourse: function(req, res){

		Courses.update({cid: req.param("cid")},
			{
				cname : req.param('name'),
				department : req.param('department'),
				programme : 	req.param('programme'),
				startdate : req.param('startdate'),
				enddate : req.param('enddate'),
				registrationfee : req.param('regfee'),
				coursefee : req.param('coursefee'),
				duration : req.param('duration'),
				syllabus : req.param('syllabus'),
				eligibility: req.param('eligibility'),
				application : req.param('application'),
				admission: req.param('admission'),
				link: req.param('link')
			}
			).exec(function(err, result){
            if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(500, { error: 'Error in Course update' });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200, { success: 'Course succesfully updated' });
        });
		},


getinfo: function(req, res){

			var cname = req.param('coursename');
			var intent = req.param('intent');
			var output;
			Courses.find().where({cname: cname}).exec(function(err, result){
				if (err) {
                sails.log.debug('Some error occured : Intent not found ' + err);
                return res.json(500, { error: 'Error Occured' });
            	}
				
				sails.log.debug(result);
				sails.log.debug(intent);
				
				for (var i=0; i < result.length; i++) {
					if (result[i][intent]) {

							if(intent == 'department')
            			 		output = cname +" comes under "+ result[i][intent] + " department. " ;
            			 	else if(intent == 'programme')
            			 		output = cname +" is a "+ result[i][intent] + " programme. " ;
            			 	else if(intent == 'startdate')
            			 		output = " Applications for " +cname +" are open from "+ result[i][intent] ;
            			 	else if(intent == 'enddate')
            			 		output = " Applications for " +cname +" are open till "+ result[i][intent] ;
            			 	else if(intent == 'registrationfee')
            			 		output = " Registration fee for " +cname +" is Rs "+ result[i][intent] ;
            			 	else if(intent == 'coursefee')
            			 		output = " You can find the fee structure for " +cname +" in the link provided "+ result[i][intent] ;
            			 	else if(intent == 'duration')
            			 		output =  "The "+intent+" for "+cname+" is "+result[i][intent] ;
            			 	else if(intent == 'syllabus')
            			 		output = " You can find the syllabus structure for " +cname +" in the link provided "+ result[i][intent] ;
            			 	else if(intent == 'eligibility')
            			 		output = " You can find the eligibility criteria for " +cname +" in the link provided "+ result[i][intent] ;
            			 	else if(intent == 'application')
            			 		output = " You can refer to the given link for the whole application process " + result[i][intent] ;
            			 	else if(intent == 'admission')
            			 		output = " Kindly refer to the link provided " + result[i][intent] + " for knowing the complete admission process ";
            			 	else if(intent == 'application')
            			 	    output = " For the whole application process you can refer to the following link "+ result[i][intent] ;
            			 	else if(intent == 'admission')
								output = " For the whole admission process you can refer to the following link "+ result[i][intent] ;
							else if(intent == 'info')
								output = " For the whole admission process you can refer to the following link "+ result[i][link] ;
							else 
            			 		output = "The "+intent+" for "+cname+" is "+result[i][intent] ;
            			
            			sails.log.debug(output);
            			sails.log.debug(result[i][intent]);
            			var response = output;
            			return res.json(response);
            		}//end of if
            	}//endoffor
            	
			});

		},

getcourse: function(req, res){

		Courses.find({}).exec(function (err,result){
		if(err){
			sails.log.debug('DB error occured : Courses not found ' + err);
            return res.json(500, { error: 'Error Occured:Courses not found' });
        }

		return res.json(result);
	});
		
	},

getone: function(req, res){

		var id = req.param('id');
		Courses.find({cid:id}).exec(function (err,result){
		if(err){
			sails.log.debug('DB error occured : Course not found ' + err);
            return res.json(500, { error: 'Error Occured:Course not found' });
        }

		return res.json(result);

	});

		
	}



// deletecourse : function(req, res){
// 		Courses.destroy({}).exec(function (err){
//   		if (err) {
//     		return res.json(500, { error: 'Some error occured' });
//   		}
//   		sails.log.debug('Success', JSON.stringify(result));
//         return res.json(200, { success: 'Success' });
  		
// });


}



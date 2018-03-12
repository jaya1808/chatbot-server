/**
 * CoursesController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
createcourse: function(req, res){

	var newcourse = 
	{
		cid : req.body.cid,
		cname :req.body.cname,
		department : req.body.department,
		programme :  req.body.programme,
		startdate : req.body.startdate,
		enddate : req.body.enddate,
		applicationfee : req.body.applicationfee,
		coursefee : req.body.coursefee,
		duration : req.body.duration,
		syllabus : req.body.syllabus,
		application : req.body.application,
		admission : req.body.admission,
		link : req.body.link,
		eligibility: req.body.eligibility
	};

	Courses.create(newcourse).exec(function(err, result){
    
    if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(200,{ 
                	status: 400,
                	success:false,
                	error: err,
                	data: null });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200,{ 
            	status: 200,
                success:true,
                error:null,
                data: {"cid":result.cid,"cname":result.cname}
            });
        });

	},


updatecourse: function(req, res){

	Courses.update({cid: req.body.cid},
	{
		cname : req.body.cname,
		department : req.body.department,
		programme : req.body.programme,
		startdate : req.body.startdate,
		enddate : req.body.enddate,
		applicationfee : req.body.applicationfee,
		coursefee : req.body.coursefee,
		duration : req.body.duration,
		syllabus : req.body.syllabus,
		eligibility: req.body.eligibility,
		application : req.body.application,
		admission: req.body.admission,
		link: req.body.link
	}).exec(function(err, result){
            
    if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(200,{ 
                	status: 400,
                	success:false,
                	error: err,
                	data: null });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200,{ 
            	status: 200,
                success:true,
                error:null,
                data: {"cid":result.cid,"cname":result.cname}
            });
        });


	},


getinfo: function(req, res){

	sails.log.debug('req -->'+req.body);

	var cname = req.body.result.parameters.courses;
	var intent = req.body.result.metadata.intentName;
	var output;
	Courses.find().where({cname: cname}).exec(function(err, result){
	
	if (err) 
	{
        sails.log.debug('Some error occured : Intent not found ' + err);
        return res.json(500, { error: 'Error Occured' });
    }
				
	sails.log.debug(cname);
	sails.log.debug(result);
	sails.log.debug(intent);

	if(intent == 'info')
	{
		output = " For more information on " +cname+ " visit " + result[0].link ;
		sails.log.debug(output);
        var response = output;
		res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  		return res.send(JSON.stringify({ "speech": response, "displayText": response }));
	}

	// else
	// {
				
	for (var i=0; i < result.length; i++) {
	// 	if (result[i][intent]) 
	// 	{
			if(intent == 'department' || intent == 'department-context')
            	output = cname +" comes under "+ result[i].department + " department. " ;
            else if(intent == 'programme' || intent == 'programme-context')
            	output = cname +" is a "+ result[i].programme + " programme. " ;
            else if(intent == 'startdate' || intent == 'startdate-context' )
            	output = " Applications for " +cname +" are open from "+ result[i].startdate ;
            else if(intent == 'enddate' || intent == 'enddate-context')
            	output = " Applications for " +cname +" are open till "+ result[i].enddate ;
            else if(intent == 'applicationfee' || intent == 'applicationfee-context')
            	output = " Application fee for " +cname +" is Rs "+ result[i].applicationfee ;
            else if(intent == 'coursefee' || intent == 'coursefee-context')
            	output = " You can find the fee structure for " +cname +" in the link provided - "+ result[i].coursefee ;
            else if(intent == 'duration' || intent == 'duration-context')
            	output =  "The duration"+" for "+cname+" is "+result[i].duration ;
            else if(intent == 'syllabus' || intent == 'syllabus-context')
            	output = " You can find the syllabus structure for " +cname +" in the link provided - "+ result[i].syllabus ;
            else if(intent == 'eligibility' || intent == 'eligibility-context')
            	output = " You can find the eligibility criteria for " +cname +" in the link provided "+ result[i].eligibility ;
            else if(intent == 'application' || intent == 'application-context')
            	output = " You can refer to the given link for the whole application process " + result[i].application ;
            else if(intent == 'admission' || intent == 'admission-context')
            	output = " Kindly refer to the following link " + result[i].admission + " for complete admission process ";
   
			else 
            	output = "The "+intent+" for "+cname+" is "+result[i][intent] ;
            			
            sails.log.debug(output);
            var response = output;
			res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  			return res.send(JSON.stringify({ "speech": response, "displayText": response }));
            					//return res.json(response);
    //     }//end of if
       }//endoffor
    // }//end of else
            	
	});
	},


getallcourses: function(req, res){
	
	Courses.find({}).exec(function (err,result){
	
	if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(200,{ 
                	status: 400,
                	success:false,
                	error: err,
                	data: null });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200,{ 
            	status: 200,
                success:true,
                error:null,
                data: result
            });
        });

	},

getcourse: function(req, res){

	
	Courses.find({cid: req.body.cid}).exec(function (err,result){
	sails.log.debug(req.body.cid);
	if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(200,{ 
                	status: 400,
                	success:false,
                	error: err,
                	data: null });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200,{ 
            	status: 200,
                success:true,
                error:null,
                data: result
            });
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
var mandrill = require('mandrill')('UXzbTqcBZKlp3-xIsLOH6Q'); 

function sendEmail ( _name, _email, _subject, _message) {
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'noreply@decknology.com',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error) console.log( error );
        else console.log(response);
    });
};

exports.sendEmailRequest = function (req, res) {
	var emailName = req.body.name;
    var emailAddress = req.body.email;
    var emailSubject = req.body.subject;
    var emailBody = req.body.message;
    
    sendEmail ( emailName, emailAddress, emailSubject, emailBody );
    
    console.log("Sending an email to " + emailAddress);
};
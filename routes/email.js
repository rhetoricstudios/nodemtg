var mandrill = require('node-mandrill')('UXzbTqcBZKlp3-xIsLOH6Q'); 

function sendEmail ( _name, _email, _subject, _message) {
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'noreply@yourdomain.com',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error) console.log( error );
        else console.log(response);
    });
};

var sendEmailRequest = function (req, res) {
    var emailName = req.body.name;
    var emailAddress = req.body.email;
    var emailSubject = req.body.subject;
    var emailBody = req.body.message;
    
    sendEmail ( emailName, emailAddress, emailSubject, emailBody );
};
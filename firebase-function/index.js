const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const SENDGRID_API_KEY = 'SG.xxx.xxxx.....';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.setAuthData = functions.https.onRequest((request, response) => {
    var dataObj = {
        userId: `${request.query.user}`,
        authToken: `${request.query.code}`,
        taskDone: true,
    };
    console.log(dataObj);
    db.collection('CalendarAuthData').doc(dataObj.userId).set(dataObj)
        .then((res) => {
            console.log("Document successfully written!", res);
            response.send('Authenticated. Please close the browser tab to continue!');
        })
        .catch((err) => {
            console.error("Error writing document: ", error);
        });
});

exports.newBooking = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const to = req.body.to;
    const from = req.body.from;
    const customername = req.body.customername;
    const bookingDate = req.body.bookingDate;
    const datetime = req.body.datetime;
    const businessname = req.body.businessname;
    const subject = req.body.subject;

    const msg = {
        to: to,
        from: from,
        subject: subject,
        html: `
              <div style="line-height:25px;">
                  Hello ${customername}, your booking reservation on ${bookingDate} at 
                  ${datetime} with ${businessname} is confirmed. For any questions comments or concerns 
                  please do not hesitate to email us at 
                  <a href="mailto:info@sagescheduler.com">info@sagescheduler.com</a>
              </div>
          `
    }

    sgMail.send(msg)
        .then(
            resp => {
                return res.json({
                    status: 1,
                    msg: 'Mail send',
                    // body: msg,
                    data: resp
                })
            }
        )
        .catch(
            err => {
                return res.json({
                    status: 0,
                    msg: 'Mail failed',
                    // body: msg,
                    data: err
                })
            }
        );

});

exports.sendMail = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const to = req.body.to;
    const from = req.body.from;
    const body = req.body.body;
    const subject = req.body.subject;

    const msg = {
        to: to,
        from: from,
        subject: subject,
        html: body
    }

    sgMail.send(msg)
        .then(
            resp => {
                return res.json({
                    status: 1,
                    msg: 'Mail send',
                    // body: msg,
                    data: resp
                })
            }
        )
        .catch(
            err => {
                return res.json({
                    status: 0,
                    msg: 'Mail failed',
                    // body: msg,
                    data: err
                })
            }
        );

});

exports.createUser = functions.https.onRequest((req, res) => {
    console.log(req.body);
    // Grab the text parameter.
    let email = req.body.email;
    let password = req.body.password;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let phone = req.body.phone;

    admin.auth().createUser({
        email: email,
        emailVerified: false,
        // phoneNumber: phone,
        password: password,
        first_name: first_name,
        last_name: last_name,
        displayName: `${first_name} ${last_name}`
    })
        .then(
            (userRecord) => {
                console.log("Successfully created new user:", userRecord.uid);
                return res.json({
                    status: 1,
                    msg: 'Successfully created new user',
                    data: userRecord
                })
            }
        ).catch(
            (error) => {
                console.log("Error creating new user:", error);
                return res.json({
                    status: 0,
                    msg: 'Error creating new user',
                    data: error
                })
            }
        );

});


exports.deleteUser = functions.https.onRequest((req, res) => {
    console.log(req.body);
    // Grab the text parameter.
    let uid = req.body.uid;

    admin.auth().deleteUser(uid)
        .then(
            (scc) => {
                console.log('Successfully deleted user');
                return res.json({
                    status: 1,
                    msg: 'Successfully deleted user',
                    data: userRecord
                })
            }
        )
        .catch(
            (error) => {
                console.log('Error deleting user:', error);
                return res.json({
                    status: 0,
                    msg: 'Error deleting user',
                    data: error
                })
            }
        );
});
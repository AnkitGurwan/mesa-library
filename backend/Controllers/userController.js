import dotenv from 'dotenv';
dotenv.config({path:'Config/.env'});


export const sendFeedbackEmail = async(email, body, subject) => {

    try {
        const accessToken = await oAuthClient.getAccessToken();
        var transporter = nodemailer.createTransport({        // function to send mail to register user
            service: 'gmail',     // mail sending platform
            auth: {
                type: 'OAuth2',
                user: 'ankitgurwan083@gmail.com',    // Sender Mail Address
                pass: process.env.EMAIL_PASSWORD,   // Sender Mail Password
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        var mailOptions1 = {
            from: 'ankitgurwan083@gmail.com',             // Sender Email
            to: 'a.gurwan@iitg.ac.in',                             // Email requested by user
            subject: subject,         // Subject Of The Mail
            text: `User with email ${email} has complained :\n${body}`,
            //Custom Mail Message With the link to confirm email address (The link contain the user id and token corresponding)
        };

        var mailOptions2 = {
            from: 'ankitgurwan083@gmail.com',             // Sender Email
            to: email,                             // Email requested by user
            subject: "MESA Library",         // Subject Of The Mail
            text: `Dear user,\nWe have succesfully received your feedback. Kindly wait while we sort out the issues. `,
            //Custom Mail Message With the link to confirm email address (The link contain the user id and token corresponding)
        };


        transporter.sendMail(mailOptions1, function (error, info, req, res) {  // Reciving Conformation Of Sent Mail
            if (error) {
                console.log({ error });
            } else {
                console.log("Success");
            }
        });

        transporter.sendMail(mailOptions2, function (error, info, req, res) {  // Reciving Conformation Of Sent Mail
            if (error) {
                console.log({ error });
            } else {
                console.log("Success");
            }
        });

    } catch (err) {
        console.log("err = ", err);
    }
}
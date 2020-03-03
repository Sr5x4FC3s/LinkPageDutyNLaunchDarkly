const nodemailer = require('nodemailer');

const createTransporter = (service, auth_user, auth_password, client_id, client_secret) => {
  let transporter;

  if (client_id) {
    transporter = nodemailer.createTransport({
      service: service,
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        type: 'login',
        user: auth_user,
        pass: auth_password,
        clientId: client_id,
        clientSecret: client_secret,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: auth_user,
        pass: auth_password,
      },            
      debug: false,
      logger: true
    });

    // transporter = nodemailer.createTransport({
    //   service: service, 
    //   host: 'smtp.mail.yahoo.com',
    //   port: 465,
    //   secure: false,
    //   requireTLS: true,
    //   auth: {
    //     user: auth_user,
    //     pass: auth_password,
    //   },
    //   tls: {
    //     rejectUnauthorized: false
    //   },
    //   debug: false,
    //   logger: true
    // });
  }

  return transporter;
};

const createMailOptions = (from_email, to_email, subject, body) => {
  let mailOptions = {
    from: from_email, 
    to: to_email, 
    subject: subject, 
    text: body, 
  };

  return mailOptions;
};

const send = (transporter, mailOptions) => {
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return 'Error';
    } else {
      console.log('Email sent: ' + info.response);
      return 'Success';
    }
  });
};

module.exports = {
  createTransporter,
  createMailOptions,
  send,
};

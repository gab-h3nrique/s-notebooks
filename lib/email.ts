// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer'

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


interface Options {

  to: string;
  subject: string;
  html: string;

}

function Email() {


  return {

    send: async(options: Options) => {

      const info = await transporter.sendMail({...options, from: process.env.EMAIL_USER});

      return info

    }

  }

}

export default Email()
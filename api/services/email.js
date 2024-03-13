const nodemailer = require('nodemailer');
const { json } = require('sequelize');

//Implement function to send emailconst nodemailer = require('nodemailer');

class EmailSender {
    constructor() {
      this.transporter = nodemailer.createTransport({
        host: 'loadfix.net',
            port: "465",
            secure: true,
            auth: {
                user: 'info@loadfix.net',
                pass: 'hW0XRM1i1y7(+e'
            }
      });
    }
  
    async sendEmail(recipientEmail, subject, text) {
      try {
        const mailOptions = {
          from: 'info@loadfix.net', // Sender's email address
          to: recipientEmail, 
          subject: subject,
          text: text
        };
  
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully.');
        return json({msg: `Email sent successfully`});
      } catch (error) {
        console.log('Error sending email:', error);
        return json({msg: `Error sending email`});

      }
    }
  }
  

  module.exports = EmailSender;
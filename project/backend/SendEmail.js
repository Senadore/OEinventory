var nodemailer = require('nodemailer');

const pass = 'xwchfqhfwxghxskm'

const sendEmail = async ({
  fromid,
  selectedEmails,
  subject,
  body,
  attachment
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      },
      auth: {
        user: fromid,
        pass: pass,
      }
    });

    const mailOptions = {
      from: fromid,
      to: 'aaront@kleertech.com',  // Convert array of emails to comma-separated string
      subject,
      text: 'hello testing again',
      attachments: [
        {
          filename: attachment.name + '.pdf',
          content: Buffer.from(attachment.attachData.data),  // Assuming 'attachment.data' is a Buffer
          contentType: 'application/pdf'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

module.exports = sendEmail;

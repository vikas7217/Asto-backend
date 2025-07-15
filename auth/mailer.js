const { error } = require("console");
const nodemailer = require("nodemailer");

const formathtmlResponse = (body) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>New Message from Website Contact Form</h2>
    <p><strong>Full Name:</strong> ${body.fullName}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Contact Number:</strong> ${body.contactNumber}</p>
    <p><strong>Subject:</strong> ${body.subject}</p>
    <p><strong>Description:</strong></p>
    <p style="white-space: pre-wrap;">${body.description}</p>
  </div>
`;
  return htmlContent;
};

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true, // or true if using port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.PASSKEY,
  },
  logger: true,
  debug: true,
});

exports.Mail = async (body) => {

  const { name, email, message,isClient } =body
  try {
    const sentMassageToClient = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Your mail has been received`,
      text: ` The mail you sent (${message} ). has been received will inform you as soon as possible`,
      html: "<h1> test data</h1>",
    };

    const sentMassageToAstro = {
      from: process.env.SMTP_USER,
      to: process.env.TO,
      subject: `This mail was sent from ${name}`,
      text: message,
      html: "<h1> test data</h1>",
    };

    const info = await transport.sendMail(sentMassageToClient);
    const info2 = await transport.sendMail(sentMassageToAstro);
    console.log("mail sented successfully", info);
    console.log("mail sented successfully 222", info2);

    return info;
  } catch (error) {
    console.log("Mail senting error:", error);
    return { error };
  }
};

exports.inquiryMail = async (body) => {

  try {
  
  const formathtml = formathtmlResponse(body);

  const sentMassageToAstro = {
    from: process.env.SMTP_USER,
    to: process.env.TO,
    subject: `This inquiry from ${body.fullName}`,
    html: formathtml,
  };

   const sentMassageToClient = {
      from: process.env.SMTP_USER,
      to: body.email,
      subject: `Your mail has been received`,
      text: `Your inquiry is sent to the astrologer. We will inform you as soon as possible`,
      // html: "<h1> test data</h1>",
    }

  const info = await transport.sendMail(sentMassageToAstro);
  const info1 = await transport.sendMail(sentMassageToClient);
  console.log(info1,'inquiry mail',info)
    
  } catch (error) {
    console.log(error)
    
  }
};

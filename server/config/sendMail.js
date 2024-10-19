import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.SENDER_EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

export const sendEmailToUsers = (candiates, title, description, experienceLevel, endDate, email) => {
    candiates.forEach((candidate) => {
      const mailOptions = {
        from: "Cuvette Jobs",
        to: candidate.email,
        subject: `Hello there!`,
        html: `
          <h3>${title}</h3>
          <p>${description}</p>
          <p>Experience Required for this job ${experienceLevel}</p>
          <p>Last date to apply ${endDate}</p>
          <p>Thank you</p>
        `
      };


      transporter.sendMail(mailOptions, (err, info) =>{
        if(err){
          console.log(err)
        }else{
          console.log("mail sent successfully")
      }
    });
  });
};


 export const sendVerifcationCode = (email, otp) => {
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Hello there!",
      text: `This is the one time password ${otp} for your email verification.`,
    };
  
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });    
  }



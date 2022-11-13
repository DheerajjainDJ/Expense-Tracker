import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const isValidate = (email) => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(email);
};

export const sendMail = async (email, subject, redirect_url) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.AUTH_USER,
      to: email,
      subject: subject,
      html: `
      <p>You requested for password reset.</p>
      <h5>Click on this <a href=${redirect_url}>link</a> To Reset Your Password.
      `,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
    return error;
  }
};

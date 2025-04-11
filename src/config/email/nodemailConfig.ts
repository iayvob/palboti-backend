import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ENV } from "../../validations/envSchema";

//? Gmail SMTP Configuration
export const smtpConfig: SMTPTransport.Options = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
  connectionTimeout: 60000,
  socketTimeout: 60000,
};

export const transporter: Transporter = nodemailer.createTransport(smtpConfig);
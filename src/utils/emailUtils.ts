import { transporter } from "@/config/email/nodemailConfig";
import logger from "@/utils/chalkLogger";
import { ENV } from "@/validations/envSchema";
import { format } from "date-fns";
import type { SendMailOptions } from "nodemailer";

type User = {
  name: string;
  email: string;
};

// ---------- Email Styling & Template Helper ----------
const emailStyles = `
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; padding: 0 !important; }
      .content { padding: 0 !important; }
    }
    body {
      margin: 0; padding: 0;
      font-family: 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif;
      color: #2d3748; line-height: 1.5;
    }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 25px 0; background-color: #1a202c; border-radius: 8px 8px 0 0; }
    .logo { max-width: 180px; height: auto; }
    .content { background-color: #ffffff; padding: 35px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .title { color: #1a202c; font-size: 24px; font-weight: 600; margin-bottom: 20px; }
    .text { color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
    .button {
      display: inline-block; background-color: #3182ce; color: #ffffff;
      padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: 500;
      margin: 20px 0; transition: background-color 0.3s ease;
    }
    .button:hover { background-color: #2c5282; }
    .footer { text-align: center; padding: 20px; color: #718096; font-size: 14px; margin-top: 20px; }
    .details { background-color: #edf2f7; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    .social-links { margin-top: 20px; }
    .social-links a { display: inline-block; margin: 0 10px; color: #718096; text-decoration: none; }
  </style>
`;

const createEmailTemplate = (content: string): string => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Palboti Smart Warehouse</title>
      ${emailStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="cid:logo.png" alt="Palboti Smart Warehouse" class="logo">
          <p>© ${new Date().getFullYear()} Palboti Smart Warehouse. All rights reserved.</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Palboti Smart Warehouse. All rights reserved.</p>
          <p>Warehouse Management Solutions for the Modern Enterprise</p>
          <div class="social-links">
            <a href="https://twitter.com/palboti">Twitter</a> | 
            <a href="https://linkedin.com/company/palboti">LinkedIn</a> | 
            <a href="https://palboti.com/contact">Contact Us</a>
          </div>
        </div>
      </div>
    </body>
  </html>
`;

// ---------- Generic sendEmail Helper ----------
export const sendEmail = async (mailOptions: SendMailOptions): Promise<void> => {
  try {
    const mailInfo = await transporter.sendMail(mailOptions);
    console.log("Message: ", JSON.stringify(mailInfo));
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error("Error sending email:", error as string);
    throw error;
  }
};

// ---------- Scaled Email Functions ----------

// Verification Email
export const sendVerificationEmail = async (user: User, token: string): Promise<void> => {
  const subject = "Verify Your Palboti Smart Warehouse Account";
  const verificationUrl = `${ENV.CLIENT_URL}/verify-email?token=${token}`;
  const content = `
    <div>
      <h1 class="title">Verify Your Email Address</h1>
      <p class="text">Hello ${user.name},</p>
      <p class="text">Thank you for registering with Palboti Smart Warehouse. Please verify your email by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </div>
      <p class="text">If the button does not work, copy and paste the link below into your browser:</p>
      <p style="word-break: break-all; font-size: 14px; color: #718096; background: #edf2f7; padding: 10px; border-radius: 4px;">${verificationUrl}</p>
      <div class="signature">
        <p>Welcome aboard,</p>
        <p>The Palboti Team</p>
      </div>
    </div>
  `;
  const mailOptions: SendMailOptions = {
    from: ENV.EMAIL_USER ? `Palboti Smart Warehouse <${ENV.EMAIL_USER}>` : "support@palboti.com",
    to: user.email,
    subject,
    html: createEmailTemplate(content),
  };

  await sendEmail(mailOptions);
};

// Reset Password Email
export const sendResetPasswordEmail = async (user: User, token: string): Promise<void> => {
  const subject = "Reset Your Palboti Account Password";
  const resetPasswordUrl = `${ENV.CLIENT_URL}/reset-password?token=${token}`;
  const content = `
    <div>
      <h1 class="title">Reset Your Password</h1>
      <p class="text">Hello ${user.name},</p>
      <p class="text">Click the button below to reset your password. This link will expire in 60 minutes.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetPasswordUrl}" class="button">Reset Password</a>
      </div>
      <p class="text">If the button above doesn't work, copy and paste the following link into your browser:</p>
      <p style="word-break: break-all; font-size: 14px; color: #718096; background: #edf2f7; padding: 10px; border-radius: 4px;">${resetPasswordUrl}</p>
      <div class="signature">
        <p>Best regards,</p>
        <p>The Palboti Team</p>
      </div>
    </div>
  `;
  const mailOptions: SendMailOptions = {
    from: ENV.EMAIL_USER ? `Palboti Smart Warehouse <${ENV.EMAIL_USER}>` : "support@palboti.com",
    to: user.email,
    subject,
    html: createEmailTemplate(content),
  };

  await sendEmail(mailOptions);
};

// Welcome Email
export const sendWelcomeEmail = async (user: User): Promise<void> => {
  const subject = "Welcome to Palboti Smart Warehouse";
  const content = `
    <div>
      <h1 class="title">Welcome to Palboti Smart Warehouse!</h1>
      <p class="text">Hello ${user.name},</p>
      <p class="text">We're excited to have you join us. Your account has been created successfully, and you're ready to experience next-generation warehouse management.</p>
      <div class="details">
        <p><strong>Your Account:</strong> ${user.email}</p>
        <p><strong>Registration Date:</strong> ${format(new Date(), "MMMM dd, yyyy")}</p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${ENV.CLIENT_URL}/dashboard" class="button">Go to Your Dashboard</a>
      </div>
      <div class="signature">
        <p>Best regards,</p>
        <p>The Palboti Team</p>
      </div>
    </div>
  `;
  const mailOptions: SendMailOptions = {
    from: ENV.EMAIL_USER ? `Palboti Smart Warehouse <${ENV.EMAIL_USER}>` : "welcome@palboti.com",
    to: user.email,
    subject,
    html: createEmailTemplate(content),
  };

  await sendEmail(mailOptions);
};


export const sendRobotStatusEmail = async (
  user: User,
  update: {
    robotId: string;
    status: "online" | "offline" | "maintenance" | "error";
    batteryLevel?: number;
    lastActive?: Date;
    message?: string;
  }
): Promise<void> => {
  const statusColors = {
    online: "#38a169",
    offline: "#e53e3e",
    maintenance: "#dd6b20",
    error: "#e53e3e",
  };

  const subject = `Robot Status Update: ${update.robotId} is ${update.status.toUpperCase()}`;
  const content = `
    <div>
      <h1 class="title">Robot Status Update</h1>
      <p class="text">Hello ${user.name},</p>
      <p class="text">Robot <strong>${update.robotId}</strong> is currently <span style="color: ${statusColors[update.status]};">${update.status.toUpperCase()}</span>.</p>
      ${update.batteryLevel !== undefined ? `<p class="text"><strong>Battery Level:</strong> ${update.batteryLevel}%</p>` : ""}
      ${update.lastActive ? `<p class="text"><strong>Last Active:</strong> ${format(update.lastActive, "MMMM dd, yyyy 'at' h:mm a")}</p>` : ""}
      ${update.message ? `<p class="text"><strong>Message:</strong> ${update.message}</p>` : ""}
      <div style="text-align: center; margin: 30px 0;">
        <a href="${ENV.CLIENT_URL}/dashboard/warehouse" class="button">View Robot Status</a>
      </div>
      <div class="signature">
        <p>Automated Notification,</p>
        <p>Palboti Robot Management System</p>
      </div>
    </div>
  `;

  const mailOptions: SendMailOptions = {
    from: ENV.EMAIL_USER ? `Palboti Smart Warehouse <${ENV.EMAIL_USER}>` : "robots@palboti.com",
    to: user.email,
    subject,
    html: createEmailTemplate(content),
    // You might set priority based on status here if desired
  };

  await sendEmail(mailOptions);
};

export const sendShipmentNotificationEmail = async (
  user: User,
  shipment: {
    shipmentId: string;
    products: Array<{ name: string; quantity: number }>;
    estimatedDelivery: Date;
    destination: string;
  }
): Promise<void> => {
  const subject = `Shipment #${shipment.shipmentId} Prepared and Ready`;

  let productsTableHtml = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
  `;
  shipment.products.forEach((product) => {
    productsTableHtml += `
      <tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
      </tr>
    `;
  });
  productsTableHtml += `
      </tbody>
    </table>
  `;

  const content = `
    <div>
      <h1 class="title">Shipment Notification</h1>
      <p class="text">Hello ${user.name},</p>
      <p class="text">Your shipment with ID <strong>${shipment.shipmentId}</strong> has been prepared and is ready for dispatch.</p>
      <div class="details">
        <p><strong>Destination:</strong> ${shipment.destination}</p>
        <p><strong>Estimated Delivery:</strong> ${format(shipment.estimatedDelivery, "MMMM dd, yyyy")}</p>
        <p><strong>Preparation Date:</strong> ${format(new Date(), "MMMM dd, yyyy")}</p>
      </div>
      <h2 class="title" style="font-size: 20px; margin-top: 30px;">Shipment Contents</h2>
      ${productsTableHtml}
      <div style="text-align: center; margin: 30px 0;">
        <a href="${ENV.CLIENT_URL}/dashboard/shipments/${shipment.shipmentId}" class="button">Track Shipment</a>
      </div>
      <div class="signature">
        <p>Thank you for using Palboti Smart Warehouse,</p>
        <p>The Palboti Logistics Team</p>
      </div>
    </div>
  `;

  const mailOptions: SendMailOptions = {
    from: ENV.EMAIL_USER ? `Palboti Smart Warehouse <${ENV.EMAIL_USER}>` : "shipments@palboti.com",
    to: user.email,
    subject,
    html: createEmailTemplate(content),
  };

  await sendEmail(mailOptions);
};

/**
 * Send successful reset password email confirmation
 * @param {User} user
 * @returns {Promise<void>}
 */
export const sendSuccessResetPasswordEmail = async (user: User): Promise<void> => {
  const subject = "Password Reset Successfully - Palboti Smart Warehouse";
  const content = `
    <div>
      <h1 class="title">Password Reset Successful</h1>
      <div class="success">
        <p>Your password has been successfully reset.</p>
      </div>
      <p class="text">Hello ${user.name},</p>
      <p class="text">This email confirms that your password for the account <strong>${user.email}</strong> has been updated.</p>
      <p class="text">You can now log in using your new password. If you did not initiate this change, please contact our support immediately.</p>
      <div class="details">
        <p><strong>Account:</strong> ${user.email}</p>
        <p><strong>Action:</strong> Password Reset</p>
        <p><strong>Date:</strong> ${format(new Date(), "MMMM dd, yyyy 'at' h:mm a")}</p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${ENV.CLIENT_URL}/login" class="button">Log In to Your Account</a>
      </div>
      <div class="signature">
        <p>Best regards,</p>
        <p>The Palboti Security Team</p>
      </div>
    </div>
  `;

  const mailOptions: SendMailOptions = {
    from: ENV.EMAIL_USER ? `Palboti Smart Warehouse <${ENV.EMAIL_USER}>` : "security@palboti.com",
    to: user.email,
    subject,
    html: createEmailTemplate(content),
  };

  await sendEmail(mailOptions);
};


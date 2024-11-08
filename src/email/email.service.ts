import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  // async createEmail(subject: string, body: string, to: string): Promise<void> {
  //   await this.prisma.email.create({
  //     data: {
  //       subject,
  //       body,
  //       to,
  //     },
  //   });
  // }

  async sendEmail(header: string): Promise<void> {
    const email = {
      to: 'thebetatester3@gmail.com',
      subject: 'POMONA NOTIFICATION',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Notification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                  color: #333;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  padding: 50px;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                  text-align: center;
              }
              h1 {
                  color: #d9534f;
              }
              p {
                  line-height: 1.6;
              }
              .button {
                  display: inline-block;
                  margin-top: 20px;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #fff;
                  background-color: #007bff;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .button:hover {
                  background-color: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Alert: ${header}</h1>
              <p>We have detected the presence of ${
                header?.includes('Drug') ? 'drugs' : 'bad issues'
              } in the meat sample.</p>
              <p>Please visit the dashboard for more details and actions:</p>
              <a href="https://dashboard-24vn-ews.education.wise-paas.com/d/PHTB_tZNk/pomona-monitor-v1?orgId=5&kiosk=tv" class="button">Go to Dashboard</a>
          </div>
      </body>
      </html>
`,
    };
    const transporter: Transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: 'f13def425a5b14',
        pass: '2c26b3ca926427',
      },
    });

    // const transporter: Transporter = nodemailer.createTransport({
    //   host: 'smtp.elasticemail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: 'thebetatester3@gmail.com',
    //     pass: '8A0DD4CDC56EE49DBF3218C42A0F4089C9F1',
    //   },
    // });

    const mailOptions = {
      from: 'thebetatester3@gmail.com',
      to: email.to,
      subject: email.subject,
      html: email.html,
    };

    await transporter.sendMail(mailOptions);
  }
}

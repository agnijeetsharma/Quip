export function verificationEmailTemplate(username: string, otp: string): string {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
          <h2 style="color: #333333;">Welcome to Quip, ${username}!</h2>
          <p style="font-size: 16px; color: #555555;">
            To complete your registration, please use the verification code below:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #2e7d32; background-color: #e8f5e9; padding: 12px 24px; border-radius: 6px;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #888888;">
            This code is valid for <strong>1 hour</strong>. If you didn’t sign up for a Quip account, you can safely ignore this email.
          </p>
          <p style="font-size: 14px; color: #888888; margin-top: 30px;">
            Thank you,<br/>
            The Quip Team
          </p>
        </div>
      </body>
    </html>
  `;
}

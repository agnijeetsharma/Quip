// src/helpers/emailTemplates.ts
export function verificationEmailTemplate(username: string, otp: string): string {
  return `
    <html>
      <body>
        <h1>Hello, ${username}</h1>
        <p>Your verification code is <strong>${otp}</strong>.</p>
        <p>Please verify your account within 1 hour.</p>
      </body>
    </html>
  `;
}

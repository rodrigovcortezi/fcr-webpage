import {Resend} from 'resend'

export const sendContactEmail = (
  name: string,
  email: string,
  message: string,
) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  return resend.emails.send({
    from: 'Meu website <onboarding@resend.dev>',
    reply_to: email,
    to: 'fcrwebsite2023@gmail.com',
    subject: 'Formuário de contato',
    html: `
      <h3>${name} mandou um mensagem pelo seu site pessoal:</h3>
      <br>
      <p>${message}</p>
    `,
  })
}

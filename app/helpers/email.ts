import {Resend} from 'resend'

export const sendContactEmail = (
  name: string,
  email: string,
  message: string,
) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const text = message.replace(/\n/g, '<br/>')
  return resend.emails.send({
    from: 'Meu website <website@fernandocortezi.com.br>',
    reply_to: email,
    to: 'fcortezi@icloud.com',
    subject: 'Formuário de contato',
    html: `
      <i><strong>${name}</strong> enviou uma mensagem através do formulário de contato:</i>
      <br>
      <br>
      <br>
      <p>${text}</p>
    `,
  })
}

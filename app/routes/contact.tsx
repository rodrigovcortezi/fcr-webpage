import {type ActionArgs, json, redirect} from '@remix-run/node'
import {Form, useNavigation, useSearchParams} from '@remix-run/react'
import {Modal} from '~/components/modal'
import {sendContactEmail} from '~/helpers/email'

export const action = async ({request}: ActionArgs) => {
  const form = await request.formData()
  const name = form.get('name')
  const email = form.get('email')
  const message = form.get('message')
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return json(null, {status: 400})
  }
  await sendContactEmail(name, email, message)
  return redirect('/contact?success=true', {})
}

const ContactRoute = () => {
  const navigation = useNavigation()
  const [searchParams, setSearchParams] = useSearchParams()
  const success = Boolean(searchParams.get('success'))

  const handleModalClose = () => {
    setSearchParams(new URLSearchParams(), {replace: true})
    const nameInput = document.getElementById('name') as HTMLInputElement
    const emailInput = document.getElementById('email') as HTMLInputElement
    const messageInput = document.getElementById('message') as HTMLInputElement
    nameInput.value = ''
    emailInput.value = ''
    messageInput.value = ''
  }

  return (
    <>
      <div className="container pt-[100px]">
        <div className="font-montserrat mb-16">
          <span className="inline-block px-[10px] py-1 mb-[11px] bg-black/[.04] leading-[30px] font-semibold text-xs text-[#333] uppercase">
            Contato
          </span>
          <h2 className="font-extrabold text-3xl text-black leading-[42px]">
            Entre em contato
          </h2>
        </div>
      </div>
      <div className="container pb-[100px]">
        <Form method="post" replace>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nome"
            className="block w-full mb-7 bg-transparent text-base font-montserrat border-solid border-[1px] border-[rgba(0,0,0,.2)] focus:ring-0 focus:border-black"
          />
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            className="block w-full mb-7 bg-transparent text-base font-montserrat border-solid border-[1px] border-[rgba(0,0,0,.2)] focus:ring-0 focus:border-black"
          />
          <textarea
            id="message"
            name="message"
            placeholder="Mensagem"
            className="block w-full mb-7 h-[200px] resize-none bg-transparent text-base border-solid border-[1px] border-[rgba(0,0,0,.2)] focus:ring-0 focus:border-black"
          />
          <button
            type="submit"
            disabled={navigation.state === 'submitting'}
            className="text-white bg-black py-2 px-10 hover:bg-opacity-80 disabled:bg-opacity-60"
          >
            {navigation.state === 'submitting' ? (
              <span className="loading-ellipsis">
                Enviando
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            ) : (
              'Enviar'
            )}
          </button>
        </Form>
      </div>
      {success ? (
        <Modal>
          <div className="font-montserrat">
            <p className="text-center text-[60px] leading-none mb-5">🎉</p>
            <h3 className="text-center font-montserrat font-medium text-black text-xl mb-8">
              Mensagem recebida!
            </h3>
            <p className="text-center">
              Agradeço o contato e retornarei assim que possível.
            </p>
            <div className="flex justify-center mt-5">
              <button
                type="button"
                className="bg-green-600 text-white py-2 px-10 hover:bg-opacity-90"
                onClick={handleModalClose}
              >
                Fechar
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  )
}

export default ContactRoute

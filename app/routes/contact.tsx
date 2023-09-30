import {type ActionArgs, json, redirect} from '@remix-run/node'
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react'
import {useEffect, useState} from 'react'
import {Modal} from '~/components/modal'
import {sendContactEmail} from '~/helpers/email'

const validateContactName = (value: string) => {
  if (value.length == 0) {
    return 'Campo obrigatório'
  }
}

const validateContactEmail = (value: string) => {
  if (value.length === 0) {
    return 'Campo obrigatório'
  }

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!regex.test(value)) {
    return 'Campo inválido'
  }
}

const validateContactMessage = (value: string) => {
  if (value.length < 20) {
    return 'Mínimo de 20 caracteres'
  }
  if (value.length > 10000) {
    return 'Limite de caracteres excedido'
  }
}

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

  const fieldErrors = {
    name: validateContactName(name),
    email: validateContactEmail(email),
    message: validateContactMessage(message),
  }
  if (Object.values(fieldErrors).some(Boolean)) {
    return json({fieldErrors}, {status: 400})
  }

  await sendContactEmail(name, email, message)

  return redirect('/contact?success=true', {})
}

type ContactInputParams = {
  as?: 'input' | 'textarea'
  id?: string
  name?: string
  type?: string
  placeholder?: string
  'aria-invalid'?: boolean
  'aria-errormessage'?: string
}

const ContactInput = ({
  as: Component = 'input',
  id,
  name,
  type,
  placeholder,
  'aria-invalid': ariaInvalid,
  'aria-errormessage': ariaErrormessage,
}: ContactInputParams) => {
  const textareaStyle = 'resize-none h-[200px]'
  return (
    <Component
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      aria-invalid={ariaInvalid}
      aria-errormessage={ariaErrormessage}
      className={`${
        Component === 'textarea' ? textareaStyle : ''
      } block w-full bg-transparent text-base font-montserrat border-solid border-[1px] border-[rgba(0,0,0,.2)] focus:ring-0 focus:border-black`}
    />
  )
}

const ContactRoute = () => {
  const actionData = useActionData<typeof action>()
  const fieldErrors = actionData?.fieldErrors
  const {state: navigationState} = useNavigation()
  const [searchParams, setSearchParams] = useSearchParams()
  const success = Boolean(searchParams.get('success'))
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (navigationState === 'submitting') {
      timeout = setTimeout(() => setSubmitting(true), 200)
    } else {
      setSubmitting(false)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [navigationState])

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
          <div className="relative mb-8">
            <ContactInput
              id="name"
              name="name"
              type="text"
              placeholder="Nome"
              aria-invalid={Boolean(fieldErrors?.name)}
              aria-errormessage={fieldErrors?.name ? 'name-error' : undefined}
            />
            {fieldErrors?.name ? (
              <p id="name-error" role="alert" className="form-validation-error">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>
          <div className="relative mb-8">
            <ContactInput
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              aria-invalid={Boolean(fieldErrors?.email)}
              aria-errormessage={fieldErrors?.email ? 'email-error' : undefined}
            />
            {fieldErrors?.email ? (
              <p
                id="email-error"
                role="alert"
                className="form-validation-error"
              >
                {fieldErrors.email}
              </p>
            ) : null}
          </div>
          <div className="relative mb-8">
            <ContactInput
              id="message"
              name="message"
              placeholder="Mensagem"
              as="textarea"
              aria-invalid={Boolean(fieldErrors?.message)}
              aria-errormessage={
                fieldErrors?.message ? 'message-error' : undefined
              }
            />
            {fieldErrors?.message ? (
              <p
                id="message-error"
                role="alert"
                className="form-validation-error"
              >
                {fieldErrors.message}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={navigationState === 'submitting'}
            className="text-white bg-black py-2 px-10 hover:bg-opacity-80 disabled:bg-opacity-60"
          >
            {submitting ? (
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

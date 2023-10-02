import type {ReactNode} from 'react'

type ModalParams = {
  children?: ReactNode
}

const Modal = ({children}: ModalParams) => {
  return (
    <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-40">
      <div className="bg-white shadow-lg border w-full h-full pt-[150px] px-7 sm:w-auto sm:h-auto sm:p-5">
        {children}
      </div>
    </div>
  )
}

export {Modal}

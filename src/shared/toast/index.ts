import { Slide, ToastOptions, toast as reactToastify } from 'react-toastify'

export default function toast(message: string, options?: ToastOptions): void {
  reactToastify(message, {
    closeOnClick: true,
    transition: Slide,
    position: reactToastify.POSITION.BOTTOM_CENTER,
    hideProgressBar: true,
    ...options,
  })
}

export function errorMessage(message: string, options?: ToastOptions): void {
  toast(message, {
    closeOnClick: true,
    transition: Slide,
    type: 'error',
    hideProgressBar: true,
    ...options,
  })
}

export function successMessage(message: string, options?: ToastOptions): void {
  toast(message, {
    closeOnClick: true,
    transition: Slide,
    type: 'success',
    hideProgressBar: true,
    ...options,
  })
}

import { ToastOptions, toast as reactToastify } from 'react-toastify'

export default function toast(message: string, options?: ToastOptions): void {
  reactToastify(message, {
    closeOnClick: true,
    position: reactToastify.POSITION.BOTTOM_CENTER,
    ...options,
  })
}

export function errorMessage(message: string, options?: ToastOptions): void {
  toast(message, {
    closeOnClick: true,
    type: 'error',
    ...options,
  })
}

export function successMessage(message: string, options?: ToastOptions): void {
  toast(message, {
    closeOnClick: true,
    type: 'success',
    ...options,
  })
}

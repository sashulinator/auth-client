import { ToastOptions, toast as reactToastify } from 'react-toastify'

export default function toast(message: string, options?: ToastOptions): void {
  reactToastify(message, {
    closeOnClick: true,
    ...options,
  })
}

export function errorMessage(message: string, options?: ToastOptions): void {
  reactToastify(message, {
    closeOnClick: true,
    type: 'error',
    ...options,
  })
}

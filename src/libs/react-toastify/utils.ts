import { ReactNode } from "react"
import { Id, toast } from "react-toastify"

type ToastType = "success" | "error" | "loading"

interface ToastOptions {
    update: boolean
    id: Id
}

export function emitToast(type: ToastType, message: ReactNode): Id
export function emitToast(type: ToastType, message: ReactNode, options?: ToastOptions): void
export function emitToast(
    type: ToastType,
    message: ReactNode,
    options?: ToastOptions
): Id | void {
    const defaultOptions = { autoClose: 3000 }
    const defaultUpdateOptions = { ...defaultOptions, isLoading: false }

    switch (type) {
        case "success":
            return options?.update
                ? toast.update(options.id, {
                      ...defaultUpdateOptions,
                      render: message,
                      type: "success"
                  })
                : toast.success(message, defaultOptions)
        case "error":
            return options?.update
                ? toast.update(options.id, {
                      ...defaultUpdateOptions,
                      render: message,
                      type: "error"
                  })
                : toast.error(message, defaultOptions)
        case "loading":
            return toast.loading(message, {
                closeOnClick: true,
                closeButton: true,
                autoClose: false
            })
        default:
            throw new Error("Toast type not found")
    }
}

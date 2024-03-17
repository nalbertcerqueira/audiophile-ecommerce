export interface Modal {
    isOpen: boolean
    toggle: () => void
    close: () => void
}

export interface ModalContextProps {
    cartModal: Modal
    menuMobileModal: Modal
}

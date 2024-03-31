import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux"
import { AppDispatch, AppState, AppStore } from "@/store/store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppStore: () => AppStore = useStore

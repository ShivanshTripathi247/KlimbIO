import { create } from "zustand"
import type { User } from "./user-form-store"

type FormMode = "add" | "edit" | "search"

type FormState = {
  mode: FormMode
  currentUser: User | null
  openForm: (mode: FormMode, user?: User) => void
  closeForm: () => void
}

export const useFormStateStore = create<FormState>((set) => ({
  mode: "add",
  currentUser: null,
  openForm: (mode, user = null) => set({ mode, currentUser: user }),
  closeForm: () => set({ mode: "add", currentUser: null }),
}))
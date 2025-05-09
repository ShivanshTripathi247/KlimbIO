import { create } from "zustand"
import { persist } from "zustand/middleware"

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  location: string
  department: string
}

type UserStore = {
  users: User[]
  addUser: (user: User) => void
  editUser: (user: User) => void
  deleteUser: (id: string) => void
  getUserByEmail: (email: string) => User | undefined
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      editUser: (updatedUser) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === updatedUser.id ? updatedUser : u
          ),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),

      getUserByEmail: (email) => {
        return get().users.find((u) => u.email === email)
      },
    }),
    {
      name: "user-storage", 
    }
  )
)

import { SquarePen } from "lucide-react"
import { Button } from "./button"

type Props = {
  user: {
    name: string
    email: string
    phone: string
    location: string
    role: string
    department?: string
  }
  onEdit: () => void
}

export function UserDetailCard({ user, onEdit }: Props) {
  return (
    <>
        <div className="bg-white p-6 rounded-md shadow-md space-y-2">
      <h2 className="text-2xl font-bold text-black">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Location:</strong> {user.location}</p>
      {user.department && <p><strong>Department:</strong> {user.department}</p>}
      
    </div>
    <Button onClick={onEdit} className="gap-2 mt-4 ml-0">
        <SquarePen size={16} /> Edit
      </Button>
    </>

  )
}

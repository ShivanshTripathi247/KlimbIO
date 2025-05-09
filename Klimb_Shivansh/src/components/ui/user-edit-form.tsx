import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { useUserStore, type User } from "@/store/user-form-store"
import { useFormStateStore } from "@/store/use-form-state-store"

const phoneRegex = /^[0-9]{10}$/
const FormSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  phone: z.string().regex(phoneRegex, { message: "Phone must be 10 digits" }),
  email: z.string().email(),
  role: z.string().min(2),
  department: z.string().min(2),
  location: z.string().min(2),
})

type Props = {
  user: User
}

export function EditUserForm({ user }: Props) {
  const editUser = useUserStore((state) => state.editUser)
  const getUserByEmail = useUserStore((state) => state.getUserByEmail)
  const { openForm } = useFormStateStore()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      firstname: user.firstName,
      lastname: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      department: user.department,
      location: user.location,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {


    if (data.email !== user.email) {
      
      const existingUser = getUserByEmail(data.email)
      if (existingUser) {
        toast.error("Email already exists", {
          description: "Please use a different email address",
        })
        return
      }
    }

    const updatedUser: User = {
      id: user.id,
      firstName: data.firstname,
      lastName: data.lastname,
      phone: data.phone,
      email: data.email,
      role: data.role,
      department: data.department,
      location: data.location,
    }

    editUser(updatedUser)

    toast.success("User Updated", {
      description: "Changes have been saved",
      action: {
        label: "View Users",
        onClick: () => openForm("search"),
      },
    })
  }

  return (
    <Card className="w-[600px] max-h-[700px] bg-neutral-100 border-2 border-neutral-400">
      <CardHeader>
        <CardTitle className="text-black text-3xl font-bold text-center">EDIT USER</CardTitle>
        <CardDescription className="text-gray-500 font-semibold text-center">Modify user details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            {[
              { name: "firstname", label: "FIRST NAME", placeholder: "First Name" },
              { name: "lastname", label: "LAST NAME", placeholder: "Last Name" },
              { name: "phone", label: "PHONE", placeholder: "Phone (10 digits)" },
              { name: "email", label: "EMAIL", placeholder: "Email" },
              { name: "role", label: "ROLE", placeholder: "Role" },
              { name: "location", label: "LOCATION", placeholder: "Location" },
              { name: "department", label: "DEPARTMENT", placeholder: "Department" },
            ].map(({ name, label, placeholder }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof z.infer<typeof FormSchema>}
                render={({ field }) => (
                  <FormItem className="text-black">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
              <Button type="submit" className="mt-4 w-full">
                Save Changes
              </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <p className="text-black font-semibold">You're editing this user</p>
      </CardFooter>
    </Card>
  )
}

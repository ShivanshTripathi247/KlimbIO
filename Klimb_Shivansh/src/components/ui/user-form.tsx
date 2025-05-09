import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner" 
import { v4 as uuidv4 } from 'uuid'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { useUserStore } from "@/store/user-form-store"
import { useFormStateStore } from "@/store/use-form-state-store"

const phoneRegex = /^[0-9]{10}$/
const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Phone number must have 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  department: z.string().min(2, {
    message: "Department must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
})

export function InputForm() {
  const addUser = useUserStore((state) => state.addUser)
  const getUserByEmail = useUserStore((state) => state.getUserByEmail)
  const { openForm } = useFormStateStore()
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      role: "",
      location: "",
      department: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {



    const existingUser = getUserByEmail(data.email)
    if (existingUser) {

      toast.error("Email already exists", {
        description: "Please use a different email address",
      })
      return
    }
    
    const newUser = {

      id: uuidv4(),
      firstName: data.firstname,
      lastName: data.lastname,
      phone: data.phone,
      email: data.email,
      role: data.role,
      department: data.department,
      location: data.location
    }
    
    addUser(newUser)
    
    form.reset()
    
    toast.success("User Added Successfully", {
      description: "New user has been added to the system",

      action: {
        label: "View Users",
        onClick: () => openForm("search"),
      },
    })
  }

  return (
    <Card className="w-[600px] max-h-[700px] bg-neutral-100 border-2 border-neutral-400">
        <CardHeader>
          <CardTitle className="text-black text-3xl font-bold text-center">New Users</CardTitle>
            <CardDescription className="text-gray-500 font-semibold text-center">Add your details here</CardDescription>
        </CardHeader>
        <CardContent >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem className="text-black">   
                        <FormLabel>FIRST NAME</FormLabel>
                        <FormControl>
                            <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem className="text-black">   
                        <FormLabel>LAST NAME</FormLabel>
                        <FormControl>
                            <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="text-black">   
                        <FormLabel>PHONE</FormLabel>
                        <FormControl>
                            <Input placeholder="Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="text-black">   
                        <FormLabel>EMAIL</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />  
                    <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="text-black">   
                        <FormLabel>ROLE</FormLabel>
                        <FormControl>
                            <Input placeholder="Role" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className="text-black">   
                        <FormLabel>LOCATION</FormLabel>
                        <FormControl>
                            <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem className="text-black">   
                        <FormLabel>DEPARTMENT</FormLabel>
                        <FormControl>
                            <Input placeholder="Department" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="mt-6">Submit</Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <p className="text-black font-semibold">
                Join us !
            </p>
        </CardFooter>
    </Card>
  )
}
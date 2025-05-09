import { useState, useRef } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { PlusCircle} from 'lucide-react';
import { Input } from "./input";
import {
  Table, TableBody, TableCaption, TableCell, TableFooter,
  TableHead, TableHeader, TableRow
} from "./table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { UserDetailCard } from "./user-detail-card";
import { useFormStateStore } from "@/store/use-form-state-store";
import { useUserStore, type User } from "@/store/user-form-store";

interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  department?: string;
}

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserCardProps | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { openForm } = useFormStateStore();
  const users = useUserStore((state) => state.users);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const matchingEmails = users
    .map(u => u.email)
    .filter(email => email.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm);

  return (
    <Card className="w-[600px] max-h-[700px] bg-neutral-100 border-2 border-neutral-400 overflow-auto relative">
      
      <CardHeader>
        <div className="flex flex-row justify-between">
           <CardTitle className="text-black text-3xl font-bold text-center">Manage Users</CardTitle>
            <div className="space-x-4">
            <Button
              className="space-x-4 w-30"
              onClick={() => openForm("add")}
            >
              <PlusCircle /> Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 relative">
        <div className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search user by email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
            {showSuggestions && matchingEmails.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow">
              {matchingEmails.map((email, idx) => (
                <li
                  key={idx}
                  className="px-3 py-2 hover:bg-neutral-200 cursor-pointer text-sm"
                  onClick={() => {
                    setSearchTerm(email);
                    setShowSuggestions(false);
                      inputRef.current?.blur();
                  }}
                >
                  {email}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Table>
          <TableCaption>List of users</TableCaption>
          <TableHeader>
              <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Phone no.</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="cursor-pointer hover:bg-neutral-200"
                  onClick={() => {
                    setSelectedUser({
                      name: `${user.firstName} ${user.lastName}`,
                      email: user.email,
                      phone: user.phone,
                      location: user.location,
                      role: user.role,
                      department: user.department
                    });
                    setIsDialogOpen(true);
                  }}
                  >
                  <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell className="text-right">{user.role}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                    No users found. Add a new user to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">{filteredUsers.length} Users</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
          {selectedUser && (
            <UserDetailCard
              user={selectedUser}
              onEdit={() => {

                const originalUser = users.find(u => u.email === selectedUser.email);
                
                if (originalUser) {
                  openForm("edit", originalUser);
                  setIsDialogOpen(false);
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
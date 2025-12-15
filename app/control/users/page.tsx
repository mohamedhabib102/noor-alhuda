"use client";

import req from "@/lib/axios";
import { useEffect, useState } from "react";



interface User {
    personID: number;
    personName: string;
    email: string;
}


const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    const getAllUsers = async () => {
      try {
        const response = await req.get("/api/Alhoda_Alnabawya/GetAllPerson");
        setUsers(response.data); // ✅ Safe
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      const fetchData = async () => {
        await getAllUsers();
      };
    
      fetchData();
    }, []);

    

    const deleteUser = async (id: number) => {
        const PersonID = id;
        try {
            console.log("Deleting user with ID:", PersonID);
            await req.delete(`/api/Alhoda_Alnabawya/DeletePerson/{${PersonID}}`)
            .then(() => {
              getAllUsers();
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            {users.map((user) => (
                <div key={user.personID}
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors
                mb-4 last:mb-0"
                >
                    <div className="flex flex-col">
                        <p className="font-semibold">{user.personName}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
                    </div>
                    <button 
                    onClick={() => deleteUser(user.personID)}
                    className="cursor-pointer bg-red-500 hover:bg-red-600  transition text-white px-4 py-2 rounded">  Delete  </button>
                </div>
            ))}
        </div>
    );
};
export default UsersPage;
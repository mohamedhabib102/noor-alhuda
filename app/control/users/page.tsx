"use client";

import req from "@/lib/axios";
import { Post } from "@/types/Adhkar";
import { useEffect, useState } from "react";



interface User {
    personID: number;
    personName: string;
    email: string;
    createdAt: string;
}


const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    const getAllUsers = async () => {
      try {
        const response = await req.get("/api/Alhoda_Alnabawya/GetAllPerson");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
        try {
            const res = await req.get("/api/Alhoda_Alnabawya/GetAllPosts");
            setPosts(res.data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    
    useEffect(() => {
      const fetchData = async () => {
        await getAllUsers();
        await fetchPosts();
      };
    
      fetchData();
    }, []);


    const filterPostsByUser = (userId: number) => {
        const filteredPosts = posts.filter(post => post.personID === userId);
        return filteredPosts.length;
    };

    

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
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };
    return (
        <div>
            {[...users].reverse().map((user) => (

                <div key={user.personID}
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors
                mb-4 last:mb-0"
                >
                    <div className="flex flex-col">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{`${user.personID}#`}</p>
                        <p className="font-semibold">{user.personName}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          عدد المنشورات: {filterPostsByUser(user.personID)}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          تاريخ التسجيل: {formatDate(user.createdAt)}
                        </p>
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
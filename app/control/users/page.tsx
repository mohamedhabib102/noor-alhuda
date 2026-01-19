"use client";

import req from "@/lib/axios";
import { Post } from "@/types/Types";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineMail, HiOutlineCalendar, HiOutlineDocumentText } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";



interface User {
  personID: number;
  personName: string;
  email: string;
  createdAt: string;
  imagePerson?: string;
}


const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      try {
        setLoading(true);
        await Promise.all([getAllUsers(), fetchPosts()]);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
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
  const isValidImage = (src?: string) =>
    typeof src === "string" &&
    src.trim() !== "" &&
    src !== "null" &&
    src !== "nulll" &&
    src !== "undefined" &&
    (src.startsWith("/") || src.startsWith("http"));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AiOutlineLoading3Quarters className="text-4xl text-(--main-color) animate-spin" />
        <p className="text-zinc-500 font-medium animate-pulse">جاري جلب قائمة المستخدمين...</p>
      </div>
    );
  }

  if (error || users.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-500">
        لا يوجد مستخدمين لعرضهم
      </div>
    );
  }

  return (
    <div>
      {[...users].reverse().map((user) => (
        <div key={user.personID}
          className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors
                mb-4 last:mb-0"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-zinc-200 dark:border-zinc-700 bg-white shadow-sm">
              <img
                src={isValidImage(user.imagePerson) ? user.imagePerson : "/images/default.png"}
                alt={user.personName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/default.png";
                }}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{`${user.personID}#`}</p>
              <p className="font-bold text-lg text-(--main-color) flex items-center gap-2">
                <IoPersonOutline size={18} />
                {user.personName}
              </p>
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                <HiOutlineMail size={16} />
                {user.email}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <HiOutlineDocumentText size={14} className="text-(--main-color)" />
                  {filterPostsByUser(user.personID)} منشورات
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <HiOutlineCalendar size={14} className="text-(--main-color)" />
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => deleteUser(user.personID)}
            className="cursor-pointer bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded text-sm font-bold"> حذف </button>
        </div>
      ))}
    </div>
  );
};
export default UsersPage;
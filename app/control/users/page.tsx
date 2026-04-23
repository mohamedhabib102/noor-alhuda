"use client";

import req from "@/lib/axios";
import { Post } from "@/types/Types";
import { useEffect, useState, useMemo } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineMail, HiOutlineCalendar, HiOutlineDocumentText } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlineRefresh } from "react-icons/md";
import SendMessagePopup from "@/components/email/SendMessagePopup";

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
  const [popupUser, setPopupUser] = useState<User | null>(null);
  const [selectedUsersForPopup, setSelectedUsersForPopup] = useState<User[]>([]);

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

  // اختار 5 مستخدمين عشوائيين بدون تغيير المصفوفة الأصلية
  const suggestedUsers = useMemo(() => {
    if (users.length === 0) return [];
    return [...users].sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [users]); // بيتحسب مرة واحدة بس لما البيانات تيجي

  const filterPostsByUser = (userId: number) => {
    const filteredPosts = posts.filter(post => post.personID === userId);
    return filteredPosts.length;
  };

  const deleteUser = async (id: number) => {
    try {
      await req.delete(`/api/Alhoda_Alnabawya/DeletePerson/{${id}}`);
      getAllUsers();
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
    (src.startsWith("/") || src.startsWith("http"));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AiOutlineLoading3Quarters className="text-4xl text-main-color animate-spin" />
        <p className="text-zinc-500 font-medium animate-pulse">جاري جلب قائمة المستخدمين...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* قسم الاقتراحات (5 مستخدمين عشوائيين) */}
      <div className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-main">مستخدمين مقترحين</h3>
            <p className="text-xs text-zinc-500">تم اختيار 5 مستخدمين بشكل عشوائي للتواصل السريع</p>
          </div>
          <button 
            onClick={() => setSelectedUsersForPopup(suggestedUsers)}
            className="cursor-pointer bg-main text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-main/20"
          >
            <MdOutlineEmail size={18} />
            ارسال للـ 5 مستخدمين
          </button>

          
        </div>
        <button 
            onClick={() => {
              getAllUsers()
            }}
            className="mb-4 cursor-pointer bg-main text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-main/20"
          >
            <MdOutlineRefresh size={18} />
            اعادة تحميل المستخدمين 
          </button>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {suggestedUsers.map(user => (
            <div key={user.personID} className="bg-white dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
               <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2 border border-main/20">
                  <img src={isValidImage(user.imagePerson) ? user.imagePerson : "/images/default.png"} alt="" className="w-full h-full object-cover" />
               </div>
               <p className="text-xs font-bold truncate">{user.personName}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">قائمة كل المستخدمين</h3>
        </div>

        {[...users].reverse().map((user) => (
          <div key={user.personID}
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-main/30 transition-all mb-4 last:mb-0 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-zinc-100 dark:border-zinc-800 bg-white">
                <img
                  src={isValidImage(user.imagePerson) ? user.imagePerson : "/images/default.png"}
                  alt={user.personName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold text-zinc-400">{`${user.personID}#`}</p>
                <p className="font-bold text-lg text-main flex items-center gap-2">
                  <IoPersonOutline size={18} />
                  {user.personName}
                </p>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  <HiOutlineMail size={16} />
                  {user.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setPopupUser(user);
                  setSelectedUsersForPopup([]);
                }}
                className="cursor-pointer flex items-center gap-1.5 bg-main/10 text-main hover:bg-main hover:text-white transition px-4 py-2 rounded-lg text-sm font-bold"
              >
                <MdOutlineEmail size={16} />
                رسالة
              </button>
              <button
                onClick={() => deleteUser(user.personID)}
                className="cursor-pointer bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition px-4 py-2 rounded-lg text-sm font-bold">
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Send Message Popup */}
      {(popupUser || selectedUsersForPopup.length > 0) && (
        <SendMessagePopup
          user={popupUser || undefined}
          users={selectedUsersForPopup}
          onClose={() => {
            setPopupUser(null);
            setSelectedUsersForPopup([]);
          }}
        />
      )}
    </div>
  );
};
export default UsersPage;
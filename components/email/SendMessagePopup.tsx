"use client";

import { useState } from "react";
import { islamicMessages } from "@/lib/messages";
import { IoClose, IoSend, IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";

type User = {
  personName: string;
  email: string;
};

interface SendMessagePopupProps {
  user?: User;
  users?: User[];
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function SendMessagePopup({ user, users = [], onClose }: SendMessagePopupProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);

  const recipients = user ? [user] : users;
  const selectedMessage = islamicMessages.find((m) => m.id === selectedMessageId);

 const handleSend = async () => {
  if (!selectedMessage || recipients.length === 0) return;

  setStatus("loading");
  setProgress(0);

  try {
    const requests = recipients.map((user: User) => {
      console.log(user.email);

      return axios.post("/api/send", {
        email: user.email,
        message: selectedMessage.content,
        subject: selectedMessage.title,
        userName: user?.personName,
      });
    });

    const res = await Promise.allSettled(requests);

    console.log(res);

    setProgress(100);
    setStatus("success");

    setTimeout(() => {
      onClose();
    }, 1000);
  } catch (err) {
    console.log(err);
    setStatus("error");
  }
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #fdfbf7 0%, #f0f7f2 100%)",
          border: "1px solid #d1fae5",
        }}
        dir="rtl"
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #0e582d 0%, #1a7a3f 100%)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <HiOutlineMail size={20} color="#ceaf15" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-none">إرسال رسالة</h2>
              <p className="text-white/70 text-sm mt-0.5">
                {recipients.length === 1 ? recipients[0].personName : `إرسال إلى ${recipients.length} مستخدم`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
          >
            <IoClose size={18} color="white" />
          </button>
        </div>

        {/* Decorative Bismillah */}
        <div className="text-center py-3" style={{ backgroundColor: "#ceaf15", color: "#0e582d" }}>
          <span className="font-bold text-sm tracking-widest">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
        </div>

        <div className="p-6 space-y-6">
          {/* Status: Success */}
          {status === "success" && (
            <div className="flex flex-col items-center gap-3 py-8 text-center animate-pulse">
              <IoCheckmarkCircle size={60} color="#0e582d" />
              <p className="font-bold text-xl" style={{ color: "#0e582d" }}>تم الإرسال بنجاح!</p>
              <p className="text-zinc-500 text-sm">جزاك الله خيراً على نشر الخير</p>
            </div>
          )}

          {/* Status: Error */}
          {status === "error" && (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <IoAlertCircle size={48} color="#ef4444" />
              <p className="font-bold text-red-500">حدث خطأ أثناء الإرسال</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 px-4 py-2 rounded-lg text-sm font-medium text-white cursor-pointer"
                style={{ backgroundColor: "#0e582d" }}
              >
                حاول مرة أخرى
              </button>
            </div>
          )}

          {/* Message Selection */}
          {(status === "idle" || status === "loading") && (
            <>
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: "#0e582d" }}>
                  اختر رسالة مناسبة:
                </p>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {islamicMessages.map((msg) => (
                    <label
                      key={msg.id}
                      className="flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
                      style={{
                        borderColor: selectedMessageId === msg.id ? "#0e582d" : "#e5e7eb",
                        backgroundColor: selectedMessageId === msg.id ? "#f0fdf4" : "#ffffff",
                      }}
                    >
                      <input
                        type="radio"
                        name="islamic-message"
                        className="mt-1 shrink-0 accent-brand-green"
                        checked={selectedMessageId === msg.id}
                        onChange={() => setSelectedMessageId(msg.id)}
                      />
                      <div>
                        <p className="font-bold text-sm" style={{ color: "#0e582d" }}>{msg.title}</p>
                        <p className="text-zinc-600 text-xs mt-1 leading-relaxed line-clamp-2">{msg.content}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Progress Bar for Bulk */}
              {status === "loading" && recipients.length > 1 && (
                <div className="w-full bg-zinc-200 rounded-full h-2.5">
                  <div 
                    className="bg-main h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                  <p className="text-center text-xs mt-1 text-zinc-500 font-bold">جاري الإرسال... {progress}%</p>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!selectedMessageId || status === "loading"}
                className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                style={{
                  background: !selectedMessageId
                    ? "#9ca3af"
                    : "linear-gradient(135deg, #0e582d 0%, #1a7a3f 100%)",
                  cursor: !selectedMessageId ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" size={18} />
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <IoSend size={18} />
                    <span>إرسال لـ {recipients.length} مستخدم</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

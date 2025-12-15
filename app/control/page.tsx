"use client";

import req from "@/lib/axios";
import { useAuth } from "@/lib/contextapi";
import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";






export default function AnalyticsPage() {
    const [post, setPost] = useState(0);
    const [question, setQuestion] = useState(0);
    const [user, setUser] = useState(0);
    const {userData} = useAuth();


    const getPosts = async() => {
        try {
            await req.get("/api/Alhoda_Alnabawya/GetAllPosts").then((res) => {
                setPost(res.data.length);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const getQuestions = async() => {
        try {
            await req.get("/api/Alhoda_Alnabawya/GetAllQuestionsAndResponses").then((res) => {
                setQuestion(res.data.length);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const getUsers = async() => {
        try {
            await req.get("/api/Alhoda_Alnabawya/GetAllPerson").then((res) => {
                setUser(res.data.length);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPosts();
        // getQuestions();
        getUsers();
    }, []);

    useEffect(() => {
        if (userData?.role !== "Admin" || !userData?.personID) {
            location.href = "/";
        }
    }, [userData]);
    const trafficData = [
    { name: "Posts", value: post, color: "#10b981" }, 
    { name: "Questions", value: question || 10, color: "#f59e0b" }, 
    { name: "Users", value: user, color: "#3b82f6" }, 
   ];
    const COLORS = trafficData.map((item) => item.color);
    const total = useMemo(() => trafficData.reduce((acc, curr) => acc + curr.value, 0), []);
    

    return (
        <div className="w-full p-6 space-y-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50"> تحليل موقع نور الهدى </h2>
                    <p className="text-zinc-500 dark:text-zinc-400"> تحليل موقع نور الهدى لشهر  {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()} </p>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">إجمالي التفاعلات</span>
                    <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{total.toFixed(1)}%</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
                {/* Chart Section */}
                <div className="w-full lg:w-1/3 h-[350px] bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 p-4 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={trafficData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {trafficData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--border)',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                itemStyle={{ color: 'var(--foreground)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text Overlay */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-8">
                        <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{total.toFixed(0)}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total</p>
                    </div>
                </div>

                {/* Breakdown Grid */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trafficData.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-4 h-4 rounded-full shadow-sm"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-lg font-medium text-zinc-700 dark:text-zinc-200">{item.name}</span>
                            </div>
                            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

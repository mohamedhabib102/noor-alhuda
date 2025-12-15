"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomContainer from "@/ui/CustomContainer";
import { cn } from "@/lib/utils";

const navItems = [
    { name: " لوحة التحكم ", href: "/control" },
    { name: " المستخدمين ", href: "/control/users" },
    { name: " المقالات ", href: "/control/posts" },
    { name: " الأسئلة ", href: "/control/questions" },
];

const ControlNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className="mb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "pb-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2",
                                isActive
                                    ? "border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500"
                                    : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                            )}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="py-8 min-h-screen bg-white dark:bg-black">
            <CustomContainer>
                <div className="flex flex-col">
                    <ControlNavbar />
                    <main className="w-full">
                        {children}
                    </main>
                </div>
            </CustomContainer>
        </div>
    );
};

export default LayoutDashboard;

"use client";
import { createContext, useContext, useState } from "react";
import jsCookie from "js-cookie";
import { signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

interface User {
    personID: number;
    personName: string;
    email: string;
    role: string;
    createdAt: string;
    image: string;
    imageGoogle: string;
}

interface ContextValue {
    userData: User | null;
    login: (user: User) => void;
    logout: ({ url }: { url: string }) => void;
}

const Context = createContext<ContextValue>({
    userData: null,
    login: () => { },
    logout: () => { }
});

interface ContextProps {
    children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProps) => {

    // Read cookie immediately on initialization
    const getUserFromCookie = (): User | null => {
        const user = jsCookie.get("user");
        if (user) {
            try {
                return JSON.parse(user);
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                return null;
            }
        }
        return null;
    };

    const [userData, setUserData] = useState<User | null>(getUserFromCookie());

    const login = (user: User) => {
        setUserData(user);
        jsCookie.set("user", JSON.stringify(user), { expires: 120, sameSite: "Lax" });
    }

    const logout = async ({ url }: { url: string }) => {
        try {
            setUserData(null);
            jsCookie.remove("user");
            // Call next-auth signOut to clear server-side httpOnly cookies
            await signOut({ callbackUrl: url });
        } catch (error) {
            console.log(error);
            // Fallback redirect if signOut fails
            window.location.href = url;
        }
    }






    return (
        <Context.Provider value={{ userData, login, logout }}>
            {children}
        </Context.Provider>
    );
};
export default Context;



export const ContextProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ContextProvider>
                {children}
            </ContextProvider>
        </SessionProvider>
    );
};

export const useAuth = () => {
    return useContext(Context);
}

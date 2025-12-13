"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jsCookie from "js-cookie";

interface User {
    personID: number;
    personName: string;
    email: string;
    gender: string;
    role: string;
    createdAt: string;
}

interface ContextValue {
    userData: User | null;
    login: (user: User) => void;
    logout: ({url} : {url: string}) => void;
}

const Context = createContext<ContextValue>({
    userData: null,
    login: () => { },
    logout: ({url} : {url: string}) => { }
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
        jsCookie.set("user", JSON.stringify(user));
    }

    const logout = ({url} : {url: string}) => {
        try {
            setUserData(null);
            jsCookie.remove("user");
            window.location.href = url;
        } catch (error) {
            console.log(error);
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
        <ContextProvider>
            {children}
        </ContextProvider>
    );
};

export const useAuth = () => {
    return useContext(Context);
}

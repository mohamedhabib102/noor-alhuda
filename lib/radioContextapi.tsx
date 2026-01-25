"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jsCookie from "js-cookie";
import { Radio } from "@/types/Types";





interface ContextValue {
    radioData: Radio | null;
    setRadio: (radio: Radio) => void;
    clearRadio: () => void;
}

const Context = createContext<ContextValue>({
    radioData: null,
    setRadio: () => { },
    clearRadio: () => { },
});

interface ContextProps {
    children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProps) => {

    // Read cookie immediately on initialization
    const getRadioFromCookie = (): Radio | null => {
        const radio = jsCookie.get("radio");
        if (radio) {
            try {
                return JSON.parse(radio);
            } catch (error) {
                console.error("Error parsing radio cookie:", error);
                return null;
            }
        }
        return null;
    };

    const [radioData, setRadioData] = useState<Radio | null>(null);

    // Read cookie on client-side and listen for changes
    useEffect(() => {
        const syncRadio = () => {
            const savedRadio = getRadioFromCookie();
            if (JSON.stringify(savedRadio) !== JSON.stringify(radioData)) {
                setRadioData(savedRadio);
            }
        };

        syncRadio(); // Initial sync

        // Check for cookie changes every 500ms
        const interval = setInterval(syncRadio, 500);
        return () => clearInterval(interval);
    }, [radioData]);

    const setRadio = (radio: Radio) => {
        setRadioData(radio);
        jsCookie.set("radio", JSON.stringify(radio), { expires: 7 });
    }

    const clearRadio = () => {
        setRadioData(null);
        jsCookie.remove("radio");
    }

    return (
        <Context.Provider value={{ radioData, setRadio, clearRadio }}>
            {children}
        </Context.Provider>
    );
};
export default Context;

import RadioSound from "@/components/books/RadioSound";

export const ContextProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ContextProvider>
            {children}
            <RadioSound />
        </ContextProvider>
    );
};

export const useRadio = () => {
    return useContext(Context);
}

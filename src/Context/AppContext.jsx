import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [TeluguText, setTeluguText] = useState(null);
    const [EnglishText, setEnglishText] = useState(null);
    const [TeluguAudio, setTeluguAudio] = useState(null);
    const [EnglishAudio, setEnglishAudio] = useState(null);

    return (
        <AppContext.Provider value={{
            TeluguText, setTeluguText,
            EnglishText, setEnglishText,
            TeluguAudio, setTeluguAudio,
            EnglishAudio, setEnglishAudio
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
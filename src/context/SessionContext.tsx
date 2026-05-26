
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SessionRecord {
  id: string;
  soundName: string;
  startTime: number; // Unix timestamp
  durationSeconds: number;
  endTime: number; // Unix timestamp
  stoppedManually: boolean;
}

interface SessionContextType {
  sessionHistory: SessionRecord[];
  recordSession: (session: SessionRecord) => void;
  clearHistory: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionHistory, setSessionHistory] = useState<SessionRecord[]>(() => {
    try {
      const savedHistory = localStorage.getItem('sessionHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      console.error("Failed to parse session history from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
    } catch (e) {
      console.error("Failed to save session history to localStorage:", e);
    }
  }, [sessionHistory]);

  const recordSession = useCallback((session: SessionRecord) => {
    setSessionHistory(prevHistory => {
      const newHistory = [session, ...prevHistory];
      // Limit history to a reasonable size, e.g., the last 50 sessions
      return newHistory.slice(0, 50);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSessionHistory([]);
  }, []);

  return (
    <SessionContext.Provider value={{ sessionHistory, recordSession, clearHistory }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
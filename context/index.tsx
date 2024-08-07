"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Payload, OutputImage, AppContextType } from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [payload, setPayload] = useState<Payload>({
    pipeline: "text-to-image",
    model_id: "",
  });
  const [output, setOutput] = useState<OutputImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        payload,
        setPayload,
        output,
        setOutput,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

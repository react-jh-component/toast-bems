import React, { createContext, useCallback, useContext, useState } from "react";
import * as S from "./style";
import theme from "@/common/styles/theme.style";

import { v4 as uuidv } from "uuid";
import Toast, { ToastConfig, ToastItem, ToastPosition, ToastStatusType, ToastType } from "./Toast";
import CheckSVG from "public/icons/common/check";
import WarningIcon from "public/icons/common/warning";

export interface ToastContextType {
  showToast: ({
    message,
    status,
    showCloseButton,
    toastType,
    position,
    delay,
    icon,
  }: {
    message: string;
    status?: ToastStatusType;
    showCloseButton?: boolean;
    toastType?: ToastType;
    position?: ToastPosition;
    delay?: number;
    icon?: React.ReactNode;
  }) => void;
}

const ToastContext = createContext<null | ToastContextType>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((config: ToastConfig) => {
    const {
      message,
      status,
      showCloseButton,
      toastType = "one",
      position = "center",
      delay = 3000,
      icon,
    } = config;
    let finalIcon = icon;

    if (!finalIcon) {
      finalIcon =
        status === "success" ? (
          <CheckSVG color={theme.colors.white} width={14} height={14} />
        ) : (
          <WarningIcon color={theme.colors.white} width={14} height={14} />
        );
    }

    const newToast: ToastItem = {
      id: uuidv(),
      message,
      status,
      showCloseButton,
      toastType,
      position,
      delay,
      icon: finalIcon,
    };

    if (toastType === "one") {
      setToasts([newToast]);
    } else if (toastType === "stacked") {
      setToasts((prevToasts) => [...prevToasts, newToast]);
    }
  }, []);

  const closeStackedToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <S.ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => closeStackedToast(toast.id)} />
        ))}
      </S.ToastContainer>
      ,
    </ToastContext.Provider>
  );
}

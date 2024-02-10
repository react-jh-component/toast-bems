import React, { memo, useCallback } from "react";
import theme from "@/common/styles/theme.style";
import * as S from "./style";

import CheckSVG from "public/icons/common/check";
import WarningIcon from "public/icons/common/warning";

import Button from "@/components/common/Button/Button";
import { useTimeout } from "./hooks/useTimeout";

export type ToastStatusType = "success" | "error";
export type ToastType = "stacked" | "one";
export type ToastPosition = "top" | "center" | "top_with_sidebar";
export interface ToastProps {
  status?: ToastStatusType;
  icon?: React.ReactNode;
  message: string;
  onClose: () => void;
  showCloseButton?: boolean;
  toastType?: ToastType;
  position?: ToastPosition;
  delay?: number;
}

export interface ToastConfig {
  message: string;
  status?: ToastStatusType;
  showCloseButton?: boolean;
  toastType?: ToastType;
  position?: ToastPosition;
  delay?: number;
  icon?: React.ReactNode;
}

export interface ToastItem extends ToastConfig {
  id: string;
}

const Toast = memo(
  ({
    status,
    icon,
    message,
    onClose,
    showCloseButton = false,
    toastType = "one",
    position,
    delay = 3000,
  }: ToastProps) => {
    const iconType =
      status === "success" ? (
        <CheckSVG color={theme.colors.white} width={14} height={14} />
      ) : (
        <WarningIcon color={theme.colors.white} width={14} height={14} />
      );

    const onCloseCallback = useCallback(() => {
      onClose();
    }, [onClose]);

    useTimeout(onCloseCallback, delay);

    // stacked
    if (toastType === "stacked") {
      return (
        <S.StackedToastStyle toastType={toastType}>
          {icon || iconType}
          <span className="toast-message">{message}</span>
          {showCloseButton && (
            <Button variants="outline" size="md" onClick={onCloseCallback}>
              확인
            </Button>
          )}
        </S.StackedToastStyle>
      );
    } else if (toastType === "one") {
      // one
      return (
        <S.OneToastStyle toastType={toastType} position={position}>
          {icon || iconType}
          <span className="toast-message">{message}</span>
          {showCloseButton && (
            <Button variants="outline" size="md" onClick={onCloseCallback}>
              확인
            </Button>
          )}
        </S.OneToastStyle>
      );
    }

    return null;
  },
);

export default Toast;

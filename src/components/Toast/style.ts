import styled from "@emotion/styled";
import { FONT_STYLES } from "@/common/styles/common.style";
import { ToastPosition, ToastType } from "./Toast";
import { css } from "@emotion/react";

export const ToastContainer = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.toast};
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StackedToastStyle = styled.div<{ toastType?: ToastType }>`
  position: relative;

  padding: 4px 16px;
  height: 40px;
  margin: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.gray10};
  opacity: 0.68;

  & .toast-message {
    color: ${({ theme }) => theme.colors.white};
    ${FONT_STYLES.BODY1_R16}
  }

  & .close-button {
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;
  }
`;

export const OneToastStyle = styled.div<{ toastType?: ToastType; position?: ToastPosition }>`
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 12px 40px;
  height: 40px;
  border-radius: 4px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.gray10};
  opacity: 0.68;

  ${({ position }) => {
    switch (position) {
      case "top":
        return css`
          top: 88px;
        `;
      case "top_with_sidebar":
        return css`
          top: 110px;
          left: calc(50% + 286px / 2);
        `;
      default:
        return css`
          top: 50%;
        `;
    }
  }}

  & .toast-message {
    color: ${({ theme }) => theme.colors.white};
    ${FONT_STYLES.BODY1_R16}
  }

  & .close-button {
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;
  }
`;

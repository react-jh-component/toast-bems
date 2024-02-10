import React from "react";

import CheckSVG from "public/icons/common/check";
import WarningIcon from "public/icons/common/warning";
import theme from "@/common/styles/theme.style";

export const getIconComponent = (status: "success" | "error") => {
  switch (status) {
    case "success":
      return <CheckSVG color={theme.colors.white} width={14} height={14} />;
    case "error":
      return <WarningIcon color={theme.colors.white} width={14} height={14} />;
    default:
      return null;
  }
};

import { A11yButton } from "@/shared/ui/A11yButton/A11yButton";
import { IconChevron } from "@/shared/ui/Icon/ui/IconChevron";

import { useLocation, useNavigate } from "react-router-dom";

import styles from "./BackButton.module.css";

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    const canGoBack = location.key !== "default";

    if (canGoBack) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <A11yButton className={styles.button} onClick={handleGoBack}>
      <IconChevron className={styles.icon} />
      Back
    </A11yButton>
  );
};

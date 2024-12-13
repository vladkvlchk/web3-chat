import { ReactNode } from "react";
import styles from "./LoadingSpinner.module.css";

export const LoadingSpinner = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.waveSpinner}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className={styles.loadingText}>{children}</p>
    </div>
  );
};

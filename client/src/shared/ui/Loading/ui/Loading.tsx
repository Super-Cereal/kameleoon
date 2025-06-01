import styles from "./Loading.module.css";

export const Loading = ({ color = "var(--accent-color)", size = 50, speed = 1 }) => {
  const loadingStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderColor: `${color} transparent transparent transparent`,
    animationDuration: `${speed}s`,
  };

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loading} style={loadingStyle} />
    </div>
  );
};

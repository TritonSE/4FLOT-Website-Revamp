import styles from "./CharacterCount.module.css";

export type CharacterCountProps = {
  currCount: number;
  maxCount: number;
  error: boolean;
};

export const CharacterCount = ({ currCount, maxCount, error }: CharacterCountProps) => {
  return (
    <div className={styles.wrapper}>
      {error ? (
        <p style={{ color: "#B93B3B" }}>
          {currCount}/{maxCount} characters
        </p>
      ) : (
        <p>
          {currCount}/{maxCount} characters
        </p>
      )}
    </div>
  );
};

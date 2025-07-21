import React from "react";
import Button from "./Button";
import styles from "./SuccessScreen.module.css";
import Text from "./Text";

interface SuccessScreenProps {
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const SuccessScreen = ({
  message,
  buttonText,
  onButtonClick,
}: SuccessScreenProps) => (
  <div className={styles.successContainer}>
    <Text variant="body" className={styles.successMessage}>
      {message}
    </Text>
    {buttonText && onButtonClick && (
      <div>
        <Button onClick={onButtonClick}>
          <Text variant="body">{buttonText}</Text>
        </Button>
      </div>
    )}
  </div>
);

export default SuccessScreen;

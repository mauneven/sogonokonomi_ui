import React, { useState } from "react";
import { Modal } from "@mantine/core";
import LoginContent from "./login/LoginContent";
import RegisterContent from "./register/RegisterContent";

interface AuthModalProps {
  authModalOpened: boolean;
  setAuthModalOpened: (authModalOpened: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  authModalOpened,
  setAuthModalOpened,
}) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal
      opened={authModalOpened}
      onClose={() => setAuthModalOpened(false)}
      centered
      size={"md"}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {isLogin ? (
        <LoginContent setIsLogin={setIsLogin} />
      ) : (
        <RegisterContent setIsLogin={setIsLogin} />
      )}
    </Modal>
  );
};

export default AuthModal;

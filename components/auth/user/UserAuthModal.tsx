import React, { useState } from "react";
import { Modal } from "@mantine/core";
import LoginContent from "./login/LoginContent";
import RegisterContent from "./register/RegisterContent";

interface UserAuthModalProps {
  userAuthModalOpened: boolean;
  setUserAuthModalOpened: (authModalOpened: boolean) => void;
}

const UserAuthModal: React.FC<UserAuthModalProps> = ({
  userAuthModalOpened,
  setUserAuthModalOpened,
}) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal
      opened={userAuthModalOpened}
      onClose={() => setUserAuthModalOpened(false)}
      centered
      size="md"
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

export default UserAuthModal;

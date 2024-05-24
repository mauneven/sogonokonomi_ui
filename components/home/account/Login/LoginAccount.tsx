import UserAuthModal from "@/components/auth/user/UserAuthModal";
import { Button, Group } from "@mantine/core";
import React, { useState } from "react";

const LoginAccount = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <Group>
      <Button variant="light" onClick={() => setModalOpened(true)}>
        Login
      </Button>
      <UserAuthModal
        userAuthModalOpened={modalOpened}
        setUserAuthModalOpened={setModalOpened}
      />
    </Group>
  );
};

export default LoginAccount;

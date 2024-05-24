import React from "react";
import { Button, TextInput, Title, Divider, Stack } from "@mantine/core";
import {
  IconBrandGoogleFilled,
  IconLogin2,
  IconMail,
} from "@tabler/icons-react";

interface LoginContentProps {
  setIsLogin: (value: boolean) => void;
}

const LoginContent: React.FC<LoginContentProps> = ({ setIsLogin }) => {
  return (
    <Stack>
      <Title ta={"center"}>Welcome back!</Title>
      <TextInput label="Email" placeholder="you@example.com" required />
      <TextInput label="Password" placeholder="Your password" required />
      <Stack mt="md">
        <Button leftSection={<IconLogin2 />}>Login</Button>
        <Divider my={10} label="Don't have an account?" />
        <Button
          variant="light"
          leftSection={<IconMail />}
          onClick={() => setIsLogin(false)}
        >
          Create new account
        </Button>
      </Stack>
      <Divider my={10} label="Or" />
      <Button fullWidth leftSection={<IconBrandGoogleFilled />}>
        Continue with Google
      </Button>
    </Stack>
  );
};

export default LoginContent;
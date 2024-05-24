import React, { useState } from 'react';
import { Button, Container, Group, Input, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './NavbarDesktop.module.css';
import UserAuthModal from '@/components/auth/user/UserAuthModal';
const NavbarDesktop = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <Container fluid className={classes.NavbarDesktopContainer}>
      <Group justify="space-between" align="center">
        <Title c={"yellow"}>Sogo no konomi</Title>
        <Group p={0} gap={5}>
          <Input placeholder="Search here" miw={400} />
          <Button p={4}>
            <IconSearch />
          </Button>
        </Group>
        <Group gap={5}>
          <Button variant="outline" onClick={() => setModalOpened(true)}>Login</Button>
        </Group>
      </Group>
      <UserAuthModal authModalOpened={modalOpened} setAuthModalOpened={setModalOpened}/>
    </Container>
  );
};

export default NavbarDesktop;

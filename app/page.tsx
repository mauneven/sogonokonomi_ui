"use client"
import Account from '@/components/home/account/Account';
import Explore from '@/components/home/explore/Explore';
import Search from '@/components/home/search/search';
import { Group } from '@mantine/core';
import React from 'react'

const page = () => {
  return (
    <Group justify='center' grow p={0}>
      <Account/>
      <Explore/>
      <Search/>
    </Group>
  )
}

export default page;
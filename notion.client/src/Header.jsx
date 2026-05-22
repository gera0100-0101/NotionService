import { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo'
import classes from './Header.module.css';
import { Link, NavLink } from "react-router-dom";

const links = [
  { link: '/', label: 'Напоминания' },
  { link: '/calendar', label: 'Календарь' },
  { link: '/ai', label: 'AI' },
  { link: '/support', label: 'Поддержка' },
  { link: '/logout', label: 'Выйти'}
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={({ isActive }) =>
        isActive
          ? `${classes.link} ${classes.active}`
          : classes.link
        }
      >
      {link.label}
    </NavLink>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <h3>Smart Notes</h3>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>
    </header>
  );
}
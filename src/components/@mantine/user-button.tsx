import useAuth from '@/hooks/useAuth';
import { Avatar, createStyles, Group, Menu, Text, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { IconChevronRight, IconLogout, IconSettings } from '@tabler/icons-react';

import BoxLink from '../core/box-link';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
  const { classes } = useStyles();
  const { logout } = useAuth();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Menu trigger="hover" closeDelay={500} position="top-start" offset={20} withArrow>
        <Menu.Target>
          <Group>
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>

            {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
          </Group>
        </Menu.Target>

        <Menu.Dropdown>
          <BoxLink to={'/profile/settings'}>
            <Menu.Item icon={<IconSettings size={16} />}>Cài đặt</Menu.Item>
          </BoxLink>
          <UnstyledButton onClick={logout}>
            <Menu.Item icon={<IconLogout size={16} />}>Đăng xuất</Menu.Item>
          </UnstyledButton>
        </Menu.Dropdown>
      </Menu>
    </UnstyledButton>
  );
}

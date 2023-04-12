import { ReactNode } from 'react';

import { LinksGroup } from '@/components/@mantine/navbar-link-group';
import { UserButton } from '@/components/@mantine/user-button';
import { Box, Code, Container, createStyles, Group, Navbar, rem, ScrollArea } from '@mantine/core';
import { IconGauge, IconLayoutCards, IconNotes } from '@tabler/icons-react';

import { Logo } from './logo';

interface IProps {
  children: ReactNode;
}

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: '/' },
  { label: 'Home', icon: IconLayoutCards, link: '/home' },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/overview' },
      { label: 'Forecasts', link: '/forecasts' },
      { label: 'Outlook', link: '/outlook' },
      { label: 'Real time', link: '/real-time' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}));

const LayoutMain = ({ children }: IProps) => {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Box display={'flex'}>
      <Navbar height={'100vh'} width={{ sm: 300 }} p="md" pb={0} className={classes.navbar}>
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Logo width={rem(120)} />
            <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton
            image="https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-6/340101543_507915518041305_1914778087821673539_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=hccF0q7h2gcAX8suvhP&_nc_ht=scontent-hkt1-1.xx&oh=00_AfB0RtNTpQy7jMxgdLsjikiJSCmTzezsxwvloWbIF8zF9g&oe=6437FCEA"
            name="Admin"
            email="admin@hola.io"
          />
        </Navbar.Section>
      </Navbar>

      <Container py={2} m={0} bg={'gray.0'} w={'100%'} maw={'none'}>
        {children}
      </Container>
    </Box>
  );
};

export default LayoutMain;

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mantine/core';

interface Props {
  to: string;
  children: ReactNode;
}

const BoxLink = ({ to, children }: Props) => {
  return (
    <Box className="w-full no-underline" component={Link} to={to}>
      {children}
    </Box>
  );
};
export default BoxLink;

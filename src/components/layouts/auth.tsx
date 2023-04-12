import { ReactNode } from 'react';

import { Box, Container, Title } from '@mantine/core';

interface IProps {
  children: ReactNode;
}
const LayoutAuth = ({ children }: IProps) => {
  return (
    <Box bg="gray.1">
      <Container sx={{ height: '100vh', display: 'grid', placeContent: 'center' }}>
        <Box className="mt-[-30%]">
          <Title align="center" className="mb-4">
            New Project
          </Title>
          <Box className="w-full sm:w-80 md:w-96 bg-white p-4 rounded-lg">{children}</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LayoutAuth;

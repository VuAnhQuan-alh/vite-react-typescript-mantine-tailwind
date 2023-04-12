import { Box, Progress, Title } from '@mantine/core';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        backgroundColor: 'white',
        inset: 0,
        position: 'fixed',
        zIndex: 'initial',
      }}
    >
      <Box w={280}>
        <Title align="center" order={2} mb={10}>
          New Project Screen
        </Title>
        <Box>
          <Progress value={100} striped animate />
        </Box>
      </Box>
    </Box>
  );
};
export default SplashScreen;

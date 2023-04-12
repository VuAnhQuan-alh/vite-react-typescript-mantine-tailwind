import { lazy, Suspense, useEffect } from 'react';

import { Box, Loader } from '@mantine/core';
import { NavigationProgress, nprogress } from '@mantine/nprogress';

interface IProps {
  [key: string]: any;
}
type LazyComponent = ReturnType<typeof lazy>;

const LazyLoad = () => {
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.complete();
    };
  }, []);

  return (
    <Box className="w-full h-full grid place-content-center">
      <Loader size="lg" variant="dots" />
    </Box>
  );
};

const Loadable = (Component: LazyComponent) => (props: IProps) => {
  return (
    <Suspense fallback={<LazyLoad />}>
      <NavigationProgress />
      <Component {...props} />
    </Suspense>
  );
};
export default Loadable;

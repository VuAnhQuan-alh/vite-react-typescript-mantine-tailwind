import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { AuthConsumer, AuthProvider } from '@/contexts/auth';
import { NotificationProvider } from '@/contexts/notification';
import routers from '@/routers';
import { createEmotionCache, MantineProvider } from '@mantine/core';

import SplashScreen from './components/core/splash-screen';

const styleCache = createEmotionCache({
  key: 'mantine',
  prepend: true,
});

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <MantineProvider emotionCache={styleCache} withCSSVariables withGlobalStyles withNormalizeCSS>
          <NotificationProvider>
            <AuthConsumer>
              {(auth) => (!auth || !auth.isInitialized ? <SplashScreen /> : <RouterProvider router={routers} />)}
            </AuthConsumer>
          </NotificationProvider>
        </MantineProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

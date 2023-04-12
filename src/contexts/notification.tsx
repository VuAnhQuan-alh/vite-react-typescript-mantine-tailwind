import { createContext, ReactNode, useCallback } from 'react';

import { notifications, Notifications } from '@mantine/notifications';

interface IProps {
  children: ReactNode;
}
interface Notifications {
  title: string | null;
  content: string | null;
  severity: 'success' | 'info' | 'error' | 'warn';
}

type NotificationContextValue = (config: Notifications) => void;
const NotificationContext = createContext<NotificationContextValue | null>(null);

const ColorSev = {
  success: 'green',
  info: 'blue',
  error: 'red',
  warn: 'yellow',
};

if (process.env.NODE_ENV === 'development') {
  NotificationContext.displayName = 'NotificationContext';
}
const NotificationProvider = ({ children }: IProps) => {
  const setNotification = useCallback(
    (settings: Notifications) =>
      notifications.show({
        id: 'notifications',
        withCloseButton: true,
        color: ColorSev[settings.severity],
        title: settings.title,
        message: settings.content,
        autoClose: 4000,
      }),
    [],
  );

  return (
    <NotificationContext.Provider value={setNotification}>
      <Notifications transitionDuration={300} autoClose={2500} position="bottom-right" />

      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext, type NotificationContextValue };

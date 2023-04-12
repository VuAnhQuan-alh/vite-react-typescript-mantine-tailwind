import { useContext } from 'react';

import { NotificationContext } from '@/contexts/notification';

const useNotification = () => {
  const notificationContext = useContext(NotificationContext);
  if (!notificationContext) throw new Error('Forgot to warp component in NotificationContext');
  return notificationContext;
};
export default useNotification;

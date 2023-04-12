import { useContext } from 'react';

import { AuthContext, AuthContextValue } from '@/contexts/auth';

const useAuth = (): AuthContextValue => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('Forgot to warp component in auth-context');

  return authContext;
};
export default useAuth;

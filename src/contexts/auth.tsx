import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

import useRefresh from '@/hooks/useRefresh';
import useStorage from '@/hooks/useStorage';
import { localProfile, LoginParams, RegisterParams, signIn, signUp } from '@/services/auth';

type Login = typeof signIn;
type Register = typeof signUp;

interface IProps {
  children: ReactNode;
}
interface IUser {
  id?: string;
  username: string;
  email: string;
  roles: string[];
  accessToken?: string;
}
interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
}
interface AuthContextValue extends State {
  login: Login;
  register: Register;
  logout: () => void;
}

const initialState: State = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};
const AuthContext = createContext<AuthContextValue | null>(null);
const RefreshAuthContext = createContext<VoidFunction | null>(null);

if (process.env.NODE_ENV === 'development') {
  AuthContext.displayName = 'AuthContext';
}

const AuthProvider = (props: IProps) => {
  const { children } = props;
  const [state, setState] = useState<State>(initialState);
  const [refresh, refetch] = useRefresh();
  const [, setJwt] = useStorage('jwt');

  useEffect(() => {
    localProfile()
      .then((response) => {
        if (response) {
          setState((state) => ({
            ...state,
            isAuthenticated: true,
            isInitialized: true,
            // user: response.data
          }));
        } else {
          setState(() => ({
            isInitialized: true,
            isAuthenticated: false,
            user: null,
          }));
        }
      })
      .catch((error) => {
        console.log('profile-local: ', error);
        setState(() => ({
          isInitialized: true,
          isAuthenticated: false,
          user: null,
        }));
      });
  }, [refresh]);

  const login = async (params: LoginParams) => {
    const response = await signIn(params);

    if (response?.accessToken) {
      const { accessToken, username, email, roles } = response;
      setJwt(accessToken);
      setState(() => ({
        isAuthenticated: true,
        isInitialized: true,
        user: { username, email, roles },
      }));
    }

    return response;
  };
  const register = async (params: RegisterParams) => {
    const response = await signUp(params);
    console.log(response);

    return response;
  };
  const logout = () => {
    setJwt(null);
    setState(() => ({
      isAuthenticated: false,
      isInitialized: true,
      user: null,
    }));
    refetch();
  };
  const reset = useCallback(() => {
    setState({
      isAuthenticated: false,
      isInitialized: true,
      user: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      <RefreshAuthContext.Provider value={reset}>{children}</RefreshAuthContext.Provider>
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthProvider, AuthConsumer };
export type { AuthContextValue };

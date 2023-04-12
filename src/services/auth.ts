import { API_LOGIN, API_PROFILE, API_REGISTER } from '@/constants/api-paths';
import HttpClient from '@/utils/http-client';

interface LoginParams {
  username: string;
  password: string;
}
const signIn = (params: LoginParams) => {
  return HttpClient.post<typeof params, any>(API_LOGIN, params);
};

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}
const signUp = (params: RegisterParams) => {
  return HttpClient.post<typeof params, any>(API_REGISTER);
};

const localProfile = () => {
  return HttpClient.get<null, any>(API_PROFILE);
};

export { signIn, signUp, localProfile };
export type { LoginParams, RegisterParams };

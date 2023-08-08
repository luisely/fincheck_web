import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  token: string
}

export async function signup(body: SignupParams) {
  const { data } = await httpClient.post<SignupResponse>('/auth/signup', body)

  return data
}

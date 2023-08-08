import { httpClient } from "../httpClient";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  token: string
}

export async function signin(body: SigninParams) {
  const { data } = await httpClient.post<SigninResponse>('/auth/signin', body)

  return data
}

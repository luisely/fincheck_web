import { httpClient } from "../httpClient";

export interface CreateBankAccountParams {
  name: string
	initialBalance: number
	color: string
	type: 'CASH' | 'INVESTMENT' | 'CHECKING'
}

export async function create(params: CreateBankAccountParams) {
  const { data } = await httpClient.post('/accounts', params)

  return data
}

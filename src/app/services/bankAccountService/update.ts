import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string
  name: string
	initialBalance: number
	color: string
	type: 'CASH' | 'INVESTMENT' | 'CHECKING'
}

export async function update({id, ...params}: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/accounts/${id}`, params)

  return data
}

import { BankAccount } from "../../entities/BankAccounts";
import { httpClient } from "../httpClient";

type BankAccountResponse = Array<BankAccount>

export async function getAll() {
  const { data } = await httpClient.get<BankAccountResponse>('/accounts')

  return data
}

import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import { toast } from "react-hot-toast";
import { PageLoader } from "../../view/components/PageLoader";
import { User } from "../entities/User";

interface AuthContextValue {
  signedIn: boolean
  user: User | undefined
  signin(accessToken: string): void
  signout(): void

}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode}) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

    return !!storedAccessToken
  })

  const { isError, isSuccess, isFetching, remove, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    remove()
    setSignedIn(false);
  }, [remove])

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!')
      signout()
    }
  }, [isError, signout])

  return (
    <AuthContext.Provider value={{ signedIn: isSuccess && signedIn, signin, signout, user: data}}>
      <PageLoader isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  )
}



import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Session } from 'next-auth'

export const RefreshTokenHandler = ({
  setInterval,
}: {
  setInterval: Dispatch<SetStateAction<number>>
}) => {
  const { data: session } = useSession()

  useEffect(() => {
    if (!!session) {
      const timeRemaining = Math.round(
        ((session.accessTokenExpiresAt as number) - 30 * 60 * 1000 - Date.now()) / 1000,
      )
      setInterval(timeRemaining > 0 ? timeRemaining : 0)
    }
  }, [session])

  return null
}

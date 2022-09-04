import { FormEvent, useCallback, useState } from 'react';

export const useUsername = (initState = '') => {
  const [username, setUsername] = useState(initState);

  const changeUsername = useCallback((e?: FormEvent<HTMLInputElement>) => {
    setUsername((e?.target as HTMLInputElement).value)
  }, []);

  return {
    username,
    changeUsername,
  }
}

import { LOCAL_STORAGE_KEYS } from '../consts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IMessage } from '../models/message.interface';

export const useLocalStorageMessages = (): [IMessage[], Dispatch<SetStateAction<IMessage[]>>] => {
  const rawMessages = localStorage.getItem(LOCAL_STORAGE_KEYS.CHAT_MESSAGES);
  const parsedMessage = rawMessages ? JSON.parse(rawMessages) : null;
  const [messages, setMessages] = useState<IMessage[]>(parsedMessage || []);

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.newValue) {
        setMessages(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(messages))
  }, [messages]);

  return [messages, setMessages];
}


import { MutableRefObject, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useLocalStorageMessages } from './useLocalStorage';

const PAGE_SIZE = 25;

export const useMessages = (messageListRef: MutableRefObject<null | HTMLUListElement>) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useLocalStorageMessages();

  const [{ to, from }, setIndices] = useState({
    from: (messages.length - PAGE_SIZE) >= 0 ? (messages.length - PAGE_SIZE) : 0,
    to: messages.length || PAGE_SIZE,
  });

  const [messageView, setMessageView] = useState(messages.slice(from, to));

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  },[]);

  useEffect(() => {
    const { from, to } = {
      from: (messages.length - PAGE_SIZE) > 0 ? (messages.length - PAGE_SIZE) : 0,
      to: messages.length || PAGE_SIZE,
    };

    setMessageView(messages.slice(from, to));
    setTimeout(scrollToBottom, 0);
  }, [messages]);


  const loadNextMessages = useCallback((e: SyntheticEvent<HTMLUListElement, UIEvent>) => {
    if (from <= 0 || messageView.length === messages.length) return;

    const ul = e.target as HTMLUListElement;
    if (ul.scrollTop <= 2) {
      const { newFrom, newTo} = {
        newFrom: from - 25 > 0 ? (from - 25) : 0,
        newTo: from,
      };

      setIndices(({ from } ) => ({
        from: (from - 25) || 0,
        to: from,
      }));
      setMessageView((prev) => [...messages.slice(newFrom, newTo), ...prev]);
    }
  },[messageView, messages,from, to])

  useEffect(() => {
    scrollToBottom();
  }, [])

  const sendMessage = useCallback((username: string) => {
    setMessages((prev) => [...prev, {
      timestamp: Date.now(),
      message,
      username,
    }]);
    setMessage('');
    scrollToBottom();
  }, [message]);

  return {
    message,
    setMessage,

    messages: messageView,

    sendMessage,
    loadNextMessages
  }
}

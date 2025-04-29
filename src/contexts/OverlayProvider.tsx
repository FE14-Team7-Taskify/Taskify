import OneButtonModal from '@/components/modal/OneButtonModal';
import { createContext, useContext, useState } from 'react';

const OverlayContext = createContext<{
  message?: string;
  setMessage: (newMessage?: string) => void;
}>({ setMessage: () => {} });

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string>();
  return (
    <OverlayContext value={{ message, setMessage }}>
      {children}
      {message && <OneButtonModal message={message} />}
    </OverlayContext>
  );
}

export function useModalMessage() {
  const { message } = useContext(OverlayContext);
  return message;
}

export function useSetModalMessage() {
  const { setMessage } = useContext(OverlayContext);
  function handleSetModalMessage(message?: string) {
    setMessage(message);
  }
  return handleSetModalMessage;
}

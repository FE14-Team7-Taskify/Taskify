import { createContext, JSX, useContext, useState } from 'react';

interface OverlayContextProps {
  setIsOpen: (isOpen: boolean) => void;
  setOverlay: (overlay?: JSX.Element) => void;
}

const OverlayContext = createContext<OverlayContextProps>({
  setIsOpen: () => {},
  setOverlay: () => {},
});

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<JSX.Element | undefined>();
  return (
    <OverlayContext value={{ setIsOpen, setOverlay }}>
      {children}
      {isOpen && overlay}
    </OverlayContext>
  );
}

export function useOverlay() {
  const { setIsOpen, setOverlay } = useContext(OverlayContext);
  function close() {
    setIsOpen(false);
    setOverlay();
  }
  function handleSetOverlay(modal: JSX.Element) {
    setIsOpen(true);
    setOverlay(modal);
  }
  return { close, overlay: handleSetOverlay };
}

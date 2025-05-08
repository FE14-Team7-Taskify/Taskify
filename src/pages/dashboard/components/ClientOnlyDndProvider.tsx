'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CustomDragLayer = dynamic(() => import('./CustomDragLayer'), { ssr: false });

interface Props {
  children: ReactNode;
}

function ClientOnlyDndProvider({ children }: Props) {
  if (typeof window === 'undefined') return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      {children}
    </DndProvider>
  );
}

export default ClientOnlyDndProvider;

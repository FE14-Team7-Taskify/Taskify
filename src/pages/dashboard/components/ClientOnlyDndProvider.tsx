'use client';

import { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomDragLayer from './CustomDragLayer';

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

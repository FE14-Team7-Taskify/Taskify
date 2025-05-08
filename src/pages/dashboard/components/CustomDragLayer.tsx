'use client';

import React, { CSSProperties } from 'react';
import { useDragLayer } from 'react-dnd';
import Card from './Card';
import dynamic from 'next/dynamic';

const getItemStyles = (currentOffset: { x: number; y: number } | null): CSSProperties => {
  if (!currentOffset) {
    return { display: 'none' };
  }

  const { x, y } = currentOffset;
  return {
    transform: `translate(${x}px, ${y}px)`,
    WebkitTransform: `translate(${x}px, ${y}px)`,
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    top: 0,
    left: 0,
  };
};

function CustomDragLayer() {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !item || !currentOffset) return null;

  const previewCard = {
    id: item.cardId,
    title: item.title,
    description: item.description,
    tags: item.tags,
    dueDate: item.dueDate,
    columnId: item.columnId,
    assignee: {
      id: item.assigneeUserId,
      nickname: '',
      profileImageUrl: item.profileImageUrl,
    },
    teamId: '',
    createdAt: '',
    updatedAt: '',
    imageUrl: item.imageUrl,
  };

  return (
    <div style={getItemStyles(currentOffset)}>
      <Card card={previewCard} isPreview />
    </div>
  );
}

export default dynamic(() => Promise.resolve(CustomDragLayer), { ssr: false });

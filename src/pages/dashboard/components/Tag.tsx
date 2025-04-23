import React from 'react';
import styles from '../styles/tag.module.scss';

const tagStyleMap = new Map<string, { backgroundColor: string; color: string }>();

const colorPairs = [
  { backgroundColor: '#F9EEE3', color: '#D58D49' },
  { backgroundColor: '#F7DBF0', color: '#D549B6' },
  { backgroundColor: '#DBE6F7', color: '#4981D5' },
  { backgroundColor: '#E7F7DB', color: '#86D549' },
];

const getStyleForTag = (tag: string) => {
  if (!tagStyleMap.has(tag)) {
    const style = colorPairs[tagStyleMap.size % colorPairs.length];
    tagStyleMap.set(tag, style);
  }

  return tagStyleMap.get(tag);
};

type TagProps = {
  name: string;
};

function Tag({ name }: TagProps) {
  const { backgroundColor, color } = getStyleForTag(name) ?? {
    backgroundColor: '#F9EEE3',
    color: '#D58D49',
  };
  return (
    <span className={styles.tag} style={{ backgroundColor, color }}>
      {name}
    </span>
  );
}

export default Tag;

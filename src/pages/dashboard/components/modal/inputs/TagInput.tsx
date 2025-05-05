import { cn } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import { KeyboardEvent, useState } from 'react';
import styles from '../modal.module.scss';

export default function TagInput({
  tags = [],
  setTags,
}: {
  tags?: Array<string>;
  setTags: (list: Array<string>) => void;
}) {
  const [value, setValue] = useState<string>('');
  function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setTags([...new Set([...tags, value]).values()]);
      setValue('');
    }
  }
  function handleRemoveTag(tag: string) {
    setTags(tags.filter((el) => el !== tag));
  }
  return (
    <div className={cn(styles.inputWrapper, styles.tagInputWrapper)}>
      <label htmlFor="tag-input">태그</label>
      <div className={styles.tagInput}>
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <button className={styles.tagChip} key={tag} onClick={() => handleRemoveTag(tag)}>
              {tag}
              <Image src="/icon/X_sm.svg" alt="태그 삭제 버튼" width={16} height={16} />
            </button>
          ))}
          <input
            value={value}
            onChange={(e) => setValue((e.target as HTMLInputElement).value)}
            id="tag-input"
            onKeyDown={handleEnter}
            placeholder={tags.length > 0 ? '' : '입력 후 Enter'}
          />
        </div>
      </div>
    </div>
  );
}

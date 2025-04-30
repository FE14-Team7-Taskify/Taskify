import Image from 'next/image';
import styles from '../../styles/table.module.scss';

export default function SearchInput({
  title = '',
  setTitle,
}: {
  title?: string;
  setTitle: (value: string) => void;
}) {
  return (
    <div className={styles.searchTitle}>
      <Image src="/icon/search.svg" alt="검색 아이콘" width={24} height={24} />
      <input
        value={title}
        placeholder="검색"
        onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
      />
    </div>
  );
}

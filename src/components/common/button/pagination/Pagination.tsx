import Image from 'next/image';
import styles from './pagination.module.scss';
import { PaginationProps } from '../type';

export default function Pagination({ totalPage = 1, currentPage = 1, setPage }: PaginationProps) {
  return (
    <div className={styles.paginationBtns} id="pagination-btns">
      <button
        className={styles.btnLeft}
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        <Image src="/icon/arrow_right.svg" alt="이전 페이지 아이콘" width={16} height={16} />
      </button>
      <button
        className={styles.btnRight}
        disabled={currentPage === totalPage}
        onClick={() => setPage(currentPage + 1)}
      >
        <Image src="/icon/arrow_right.svg" alt="다음 페이지 아이콘" width={16} height={16} />
      </button>
    </div>
  );
}

import { useColumnsQuery } from '@/api/columns/columns.query';
import { cn, cond } from '@/styles/util/stylesUtil';
import { useEffect, useState } from 'react';
import styles from '../../../styles/modal.module.scss';
import ColumnRowItem from './ColumnRowItem';

export type ColumnType = {
  id: number;
  title: string;
};
interface ColumnDropdownProps {
  dashboardId: number;
  columnId: number;
  onChangeColumn: (columnId: number, columnTitle: string) => void;
}
export default function ColumnDropdown({
  dashboardId,
  columnId,
  onChangeColumn,
}: ColumnDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [column, setColumn] = useState<ColumnType>();
  const { isSuccess, data } = useColumnsQuery(dashboardId);

  useEffect(() => {
    if (!data?.data) return;
    const currentColumn = data?.data.find((el) => el.id === columnId);
    setColumn(currentColumn);
    if (currentColumn) onChangeColumn(currentColumn.id, currentColumn.title);
  }, [data?.data, columnId]);

  function handleItemClick(column: ColumnType) {
    if (!column) return;
    onChangeColumn(column.id, column.title);
    setColumn(column);
    setIsOpen(false);
  }

  return (
    <div className={cn(styles.dropdownWrapper, styles.inputWrapper)}>
      <label>상태</label>
      <div className={styles.dropdown}>
        <div className={styles.dropdownInputWrapper} onClick={() => setIsOpen(!isOpen)}>
          {!!column ? <ColumnRowItem {...column} /> : <></>}
          <div className={cn(styles.inputArrow, cond(isOpen, styles.inputArrowActive))} />
        </div>
        {isOpen && (
          <div className={styles.dropdownListWrapper}>
            {isSuccess &&
              data?.data.map(({ id, title }) => (
                <ColumnRowItem
                  key={id}
                  isActive={column?.id === id}
                  {...{ id, title, handleItemClick }}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

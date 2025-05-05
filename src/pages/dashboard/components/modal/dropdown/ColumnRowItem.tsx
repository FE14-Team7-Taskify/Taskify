import { cn, cond } from '@/styles/util/stylesUtil';
import styles from '../../../styles/modal.module.scss';
import { ColumnType } from './ColumnDropdown';

interface ColumnRowItemProps extends ColumnType {
  isActive?: boolean;
  handleItemClick?: (value: ColumnType) => void;
}
export default function ColumnRowItem({
  id,
  title,
  isActive = false,
  handleItemClick,
}: ColumnRowItemProps) {
  return (
    <div
      className={cn(styles.rowItem, cond(isActive, styles.rowActive))}
      onClick={() => handleItemClick && handleItemClick({ id, title })}
      key={id}
    >
      <div className={styles.columnChip}>{title}</div>
    </div>
  );
}

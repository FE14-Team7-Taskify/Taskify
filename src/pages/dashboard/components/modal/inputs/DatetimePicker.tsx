import { cn, cond } from '@/styles/util/stylesUtil';
import { ChangeEvent } from 'react';
import styles from '../../../styles/modal.module.scss';

export default function DatetimePicker({
  value = '',
  onChangeDate,
}: {
  value?: string;
  onChangeDate: (value: string) => void;
}) {
  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value.replace('T', ' ');
    onChangeDate(newDate);
  }
  return (
    <div className={cn(styles.inputWrapper, styles.dateInputWrapper)}>
      <label htmlFor="date-input">마감일</label>
      <input
        type="datetime-local"
        name="dueDate"
        id="date-input"
        value={value}
        onChange={handleChangeDate}
        data-placeholder="날짜를 입력해 주세요"
        className={cn(styles.dateInput, cond(!!value, styles.dateInputActive))}
      />
    </div>
  );
}

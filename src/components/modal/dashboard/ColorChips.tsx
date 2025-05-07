import { ChangeEvent } from 'react';
import styles from '../modal.module.scss';

const COLORS = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

export default function ColorChips({
  color,
  onChange,
}: {
  color: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.dashboardColorArea}>
      {COLORS.map((colorCode) => (
        <input
          key={colorCode}
          type="radio"
          name="color"
          value={colorCode}
          onChange={onChange}
          className={styles[`color-${colorCode.replace('#', '')}`]}
          checked={color === colorCode}
        />
      ))}
    </div>
  );
}

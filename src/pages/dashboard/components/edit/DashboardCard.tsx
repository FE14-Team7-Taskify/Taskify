import { useUpdateDashboardMutation } from '@/api/dashboards/dashboards.query';
import BaseButton from '@/components/common/button/BaseButton';
import Input from '@/components/common/Input';
import ColorChips from '@/components/modal/dashboard/ColorChips';
import { ChangeEvent, useState } from 'react';
import styles from '../../styles/edit.module.scss';

export default function DashBoardCard({
  dashboardId,
  title,
  color,
  updateDashboardDetail,
}: {
  dashboardId: number;
  title: string;
  color: string;
  updateDashboardDetail: () => void;
}) {
  const [value, setValue] = useState({ title, color });
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value: inputValue } = e.target as HTMLInputElement;
    setValue({ ...value, [name]: inputValue });
  }

  const btnDisabled = !value.title || (value.title === title && value.color === color);
  const mutation = useUpdateDashboardMutation(dashboardId);
  function handleUpdateDashboard() {
    mutation.mutate({ dashboardId, ...value }, { onSuccess: updateDashboardDetail });
  }

  return (
    <div className={styles.dashboardCard}>
      <div className={styles.cardDetail}>
        <h1 className={styles.headingFont}>{title}</h1>
        <div className={styles.cardInputs}>
          <div className={styles.inputField}>
            <label>대시보드 이름</label>
            <Input
              name="title"
              placeholder="대시보드 이름을 입력해 주세요"
              value={value.title}
              onChange={handleInputChange}
            />
          </div>
          <ColorChips color={value.color} onChange={handleInputChange} />
        </div>
      </div>
      <BaseButton
        className={styles.btnPrimary}
        onClick={handleUpdateDashboard}
        disabled={btnDisabled}
      >
        변경
      </BaseButton>
    </div>
  );
}

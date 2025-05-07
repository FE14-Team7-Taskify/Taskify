import { useCreateInvitationMutation } from '@/api/dashboards/dashboards.query';
import { FormEvent, useState } from 'react';
import Input from '../common/Input';
import TwoButtonModal from './TwoButtonModal';
import styles from './modal.module.scss';

export default function CreateInvitationModal({
  dashboardId,
  onClose,
}: {
  dashboardId: number;
  onClose: () => void;
}) {
  const [email, setEmail] = useState<string>('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mutation = useCreateInvitationMutation();
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function handleConfirm() {
    mutation.mutate({ dashboardId, email }, { onSuccess: () => onClose() });
  }
  return (
    <TwoButtonModal
      className={styles.invitationCreateModal}
      title="새로운 대시보드"
      btns={{
        onCancel: onClose,
        onConfirm: handleConfirm,
        rightDisabled: !emailRegex.test(email),
      }}
    >
      <form className={styles.createInvitationModalContent} onSubmit={handleFormSubmit}>
        <div className={styles.dashboardTitleArea}>
          <label>대시보드 이름</label>
          <Input
            name="title"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
        </div>
      </form>
    </TwoButtonModal>
  );
}

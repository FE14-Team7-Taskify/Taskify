import { useCreateInvitationMutation } from '@/api/dashboards/dashboards.query';
import { useOverlay } from '@/contexts/OverlayProvider';
import { cn } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import Input from '../common/Input';
import OneButtonModal from './OneButtonModal';
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
  const { overlay, close } = useOverlay();
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function handleConfirm() {
    mutation.mutate(
      { dashboardId, email },
      {
        onSuccess: () => onClose(),
        onError: (err) =>
          err.response?.data?.message &&
          overlay(<OneButtonModal message={err.response.data.message} onClose={close} />),
      },
    );
  }
  return (
    <TwoButtonModal
      className={styles.invitationCreateModal}
      btns={{
        onCancel: onClose,
        onConfirm: handleConfirm,
        rightDisabled: !emailRegex.test(email),
      }}
    >
      <form className={styles.createInvitationModalContent} onSubmit={handleFormSubmit}>
        <div className={cn(styles.modalHeader, styles.invitationModalHeader)}>
          <div>초대하기</div>
          <button className={styles.modalClose} onClick={onClose}>
            <Image src="/icon/X_lg.svg" alt="초대하기 모달 닫기 버튼 아이콘" fill />
          </button>
        </div>
        <div className={styles.invitationInputArea}>
          <label>이메일</label>
          <Input
            name="title"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
        </div>
      </form>
    </TwoButtonModal>
  );
}

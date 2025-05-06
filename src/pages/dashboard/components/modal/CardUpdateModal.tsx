import { useUpdateCardMutation } from '@/api/cards/cards.query';
import { CardType } from '@/api/cards/cards.schema';
import { useUploadColumnImageMutation } from '@/api/columns/columns.query';
import TwoButtonModal from '@/components/modal/TwoButtonModal';
import { useOverlay } from '@/contexts/OverlayProvider';
import { useState } from 'react';
import styles from '../../styles/modal.module.scss';
import ColumnDropdown from './dropdown/ColumnDropdown';
import UserDropdown from './dropdown/UserDropdown';
import DatetimePicker from './inputs/DatetimePicker';
import ImageInput from './inputs/ImageInput';
import TagInput from './inputs/TagInput';
import TextFields from './inputs/TextFields';

interface CardUpdateModalProps extends CardType {
  dashboardId: number;
}

export default function CardUpdateModal({ dashboardId, ...card }: CardUpdateModalProps) {
  const [file, setFile] = useState<File>();
  const [formValue, setFormValue] = useState(card);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const { close } = useOverlay();
  const imageMutate = useUploadColumnImageMutation();
  const updateMutate = useUpdateCardMutation();

  function handleClickUpdate() {
    if (file) {
      imageMutate.mutate(
        { columnId: card.columnId, image: file },
        {
          onSuccess: ({ imageUrl }) => {
            setFormValue({ ...formValue, imageUrl });
            handleUpdateCard(imageUrl);
          },
        },
      );
    } else handleUpdateCard();
  }
  function handleUpdateCard(imageUrl?: string) {
    const { assignee, createdAt, id, updatedAt, ...reqBody } = {
      ...formValue,
      assigneeUserId: formValue.assignee?.id,
      imageUrl,
    };
    updateMutate.mutate({ ...reqBody, cardId: id }, { onSuccess: () => close() });
  }
  const updateBtnDisabled = JSON.stringify(card) === JSON.stringify(formValue) && !isImageChanged;
  return (
    <TwoButtonModal
      className={styles.cardUpdateModal}
      title="할 일 수정"
      btns={{
        onCancel: close,
        onConfirm: handleClickUpdate,
        rightText: '수정',
        rightDisabled: updateBtnDisabled,
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.dropdownsRow}>
          <ColumnDropdown
            dashboardId={dashboardId}
            columnId={card.columnId}
            onChangeColumn={(columnId) => setFormValue({ ...formValue, columnId })}
          />
          <UserDropdown
            dashboardId={dashboardId}
            assignee={formValue.assignee}
            onChangeAssignee={(assignee) => setFormValue({ ...formValue, assignee })}
          />
        </div>
        <TextFields
          title={formValue.title}
          description={formValue.description}
          onTextChange={(name, value) => setFormValue({ ...formValue, [name]: value })}
        />
        <DatetimePicker
          value={formValue.dueDate}
          onChangeDate={(dueDate) => setFormValue({ ...formValue, dueDate })}
        />
        <TagInput tags={formValue.tags} setTags={(tags) => setFormValue({ ...formValue, tags })} />
        <ImageInput
          imageUrl={formValue.imageUrl}
          setFile={(file) => {
            setFile(file);
            !!file && setIsImageChanged(true);
          }}
        />
      </div>
    </TwoButtonModal>
  );
}

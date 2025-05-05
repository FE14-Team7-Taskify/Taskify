import { useUpdateCardMutation } from '@/api/cards/cards.query';
import { CardType } from '@/api/cards/cards.schema';
import { useUploadColumnImageMutation } from '@/api/columns/columns.query';
import TwoButtonModal from '@/components/modal/TwoButtonModal';
import { useOverlay } from '@/contexts/OverlayProvider';
import { useState } from 'react';
import DatetimePicker from './inputs/DatetimePicker';
import ImageInput from './inputs/ImageInput';
import TagInput from './inputs/TagInput';
import TextFields from './inputs/TextFields';
import styles from './modal.module.scss';

export default function CardUpdateModal(card: CardType) {
  const [file, setFile] = useState<File>();
  const [formValue, setFormValue] = useState(card);

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
    if (card.assignee) {
      const { assignee, createdAt, id, updatedAt, ...reqBody } = {
        ...formValue,
        assigneeUserId: card.assignee.id,
        imageUrl,
      };
      updateMutate.mutate({ ...reqBody, cardId: id }, { onSuccess: () => close() });
    }
  }
  const updateBtnDisabled = JSON.stringify(card) === JSON.stringify(formValue);
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
        <ImageInput imageUrl={formValue.imageUrl} setFile={setFile} />
      </div>
    </TwoButtonModal>
  );
}

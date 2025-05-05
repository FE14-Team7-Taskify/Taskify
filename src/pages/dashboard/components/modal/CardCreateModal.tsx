import { useCreateCardMutation } from '@/api/cards/cards.query';
import { useUploadColumnImageMutation } from '@/api/columns/columns.query';
import TwoButtonModal from '@/components/modal/TwoButtonModal';
import { useOverlay } from '@/contexts/OverlayProvider';
import { useState } from 'react';
import styles from '../../styles/modal.module.scss';
import UserDropdown, { AssigneeType } from './dropdown/UserDropdown';
import DatetimePicker from './inputs/DatetimePicker';
import ImageInput from './inputs/ImageInput';
import TagInput from './inputs/TagInput';
import TextFields from './inputs/TextFields';

interface CardCreateModalProps {
  dashboardId: number;
  columnId: number;
}
type FormValueType = {
  assignee?: AssigneeType;
  title: string;
  description: string;
  dueDate?: string;
  tags?: Array<string>;
  imageUrl?: string;
};
const INITIAL_FORM_VALUE = {
  title: '',
  description: '',
};

export default function CardCreateModal({ dashboardId, columnId }: CardCreateModalProps) {
  const [file, setFile] = useState<File>();
  const [formValue, setFormValue] = useState<FormValueType>(INITIAL_FORM_VALUE);

  const { close } = useOverlay();
  const imageMutate = useUploadColumnImageMutation();
  const createMutate = useCreateCardMutation();

  function handleClickUpdate() {
    if (file) {
      imageMutate.mutate(
        { columnId, image: file },
        {
          onSuccess: ({ imageUrl }) => {
            setFormValue({ ...formValue, imageUrl });
            handleCreateCard(imageUrl);
          },
        },
      );
    } else handleCreateCard();
  }
  function handleCreateCard(imageUrl?: string) {
    if (formValue.assignee) {
      const { assignee, ...reqBody } = {
        ...formValue,
        dashboardId,
        columnId,
        assigneeUserId: formValue.assignee?.id,
        imageUrl,
      };
      createMutate.mutate({ ...reqBody }, { onSuccess: () => close() });
    }
  }
  const createBtnDisabled = !formValue.title || !formValue.description;
  return (
    <TwoButtonModal
      className={styles.cardUpdateModal}
      title="할 일 생성"
      btns={{
        onCancel: close,
        onConfirm: handleClickUpdate,
        rightText: '생성',
        rightDisabled: createBtnDisabled,
      }}
    >
      <div className={styles.modalContent}>
        <UserDropdown
          dashboardId={dashboardId}
          assignee={formValue.assignee}
          onChangeAssignee={(assignee) => setFormValue({ ...formValue, assignee })}
        />
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
        <ImageInput setFile={setFile} />
      </div>
    </TwoButtonModal>
  );
}

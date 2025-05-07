import styles from '../../../styles/modal.module.scss';

export default function TextFields({
  title = '',
  description = '',
  onTextChange,
}: {
  title?: string;
  description?: string;
  onTextChange: (name: string, value: string) => void;
}) {
  return (
    <>
      <div className={styles.inputWrapper}>
        <label className={styles.essential} htmlFor="title-input">
          제목
        </label>
        <input
          type="text"
          id="title-input"
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(e) => onTextChange('title', (e.target as HTMLInputElement).value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.essential} htmlFor="description-input">
          설명
        </label>
        <textarea
          id="description-input"
          placeholder="설명을 입력해 주세요"
          value={description}
          onChange={(e) => onTextChange('description', (e.target as HTMLTextAreaElement).value)}
        />
      </div>
    </>
  );
}

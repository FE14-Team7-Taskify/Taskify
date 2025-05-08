import { cn } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import styles from '../../../styles/modal.module.scss';

export default function ImageInput({
  setFile,
  imageUrl,
}: {
  setFile: (file?: File) => void;
  imageUrl?: string | null;
}) {
  const [thumbnail, setThumbnail] = useState(imageUrl);

  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      try {
        const objectURL = URL.createObjectURL(file);
        setThumbnail(objectURL);
      } catch {}
    }
  }
  function handleRemoveImage() {
    setFile();
    setThumbnail(undefined);
  }
  return (
    <div className={cn(styles.inputWrapper, styles.imageInputWrapper)}>
      <label htmlFor="image-input">이미지</label>
      <div className={styles.imageWrapper}>
        {!!thumbnail && <img src={thumbnail} className={styles.thumbnail} alt="이미지 미리보기" />}
        <input type="file" accept="image/*" id="image-input" onChange={handleChangeFile} />
        {!!thumbnail && (
          <button onClick={handleRemoveImage}>
            <Image src="/icon/X_sm.svg" alt="이미지 지우기 버튼" width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  );
}

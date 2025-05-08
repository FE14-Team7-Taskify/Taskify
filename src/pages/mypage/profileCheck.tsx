//profileCheck.tsx
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useProfileChange } from '@/hooks/useProfileChange';
import styles from './styles/mypage.module.scss';
import buttonStyles from '@/components/common/button/myPageButton/myPageButton.module.scss';
import axios from 'axios';
import Button from '@/components/common/button/myPageButton/MypageButton';
import Input from '@/components/common/Input';

type ProfileChackProps = {
  email: string;
  imgUrl: string;
  nickname: string;
};

export default function ProfileChack({ email, imgUrl, nickname }: ProfileChackProps) {
  const { changeProfile } = useProfileChange();
  const [confirmNickname, setConfirmNickname] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('/icon/add_box_lg.svg');

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChangeProfile = async () => {
    let uploadedImageUrl = imgUrl || '';
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const res = await axios.post(
          'https://sp-taskify-api.vercel.app/14-7/users/me/image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        uploadedImageUrl = res.data.profileImageUrl || '';
        setPreviewUrl(uploadedImageUrl);
      } catch (err) {
        console.error('업로드 실패:', err);
        alert('이미지 업로드 실패');
        return;
      }
    }

    changeProfile(confirmNickname || nickname, uploadedImageUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  useEffect(() => {
    if (imgUrl) {
      setPreviewUrl(imgUrl);
    }
  }, [imgUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={styles.profileBox}>
      <div className={styles.headfont}>프로필</div>
      <div className={styles.rowWrapper}>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button className={styles.profileButton} onClick={handleClick}>
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="프로필 이미지 미리보기"
                className={styles.profileButtonImg}
                width={120}
                height={120}
              />
            )}
          </button>
        </div>
        <div className={styles.profileTextBox}>
          <div>
            이메일
            <div>
              <Input
                type="email"
                name="email"
                placeholder={email}
                className={styles.inputBox}
                readOnly
              />
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div>닉네임</div>
            <Input
              type="text"
              name="nickname"
              placeholder={`기존 닉네임:${nickname}`}
              className={styles.inputBox}
              onChange={(e) => setConfirmNickname(e.target.value)}
            />
          </div>
          <Button onClick={handleChangeProfile} className={buttonStyles.saveButton}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}

import { cn, cond } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import styles from '../../../styles/modal.module.scss';
import { AssigneeType } from './UserDropdown';

interface UserRowItemProps {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
  isActive?: boolean;
  handleItemClick?: (value: AssigneeType) => void;
}
export default function UserRowItem({
  id,
  nickname,
  profileImageUrl,
  isActive = false,
  handleItemClick,
}: UserRowItemProps) {
  return (
    <div
      className={cn(styles.rowItem, cond(isActive, styles.rowActive))}
      onClick={() => handleItemClick && handleItemClick({ id, nickname, profileImageUrl })}
      key={id}
    >
      <div className={styles.profileImageWrapper}>
        {!!profileImageUrl ? (
          <Image src={profileImageUrl} alt={`${nickname} 프로필 이미지`} width={26} height={26} />
        ) : (
          <Image
            src="/images/profile.svg"
            alt="담당자 프로필 이미지 미리보기"
            width={26}
            height={26}
          />
        )}
      </div>
      {nickname}
    </div>
  );
}

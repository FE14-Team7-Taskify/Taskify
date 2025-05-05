import { useDashboardMembersQuery } from '@/api/members/members.query';
import { MemberType } from '@/api/members/members.schema';
import { cn, cond } from '@/styles/util/stylesUtil';
import { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/modal.module.scss';
import UserRowItem from './UserRowItem';

export type AssigneeType = {
  profileImageUrl?: string | null;
  nickname: string;
  id: number;
};
interface UserDropdownProps {
  dashboardId: number;
  assignee?: AssigneeType;
  onChangeAssignee: (assignee: AssigneeType) => void;
}
export default function UserDropdown({
  dashboardId,
  assignee,
  onChangeAssignee,
}: UserDropdownProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [param, setParam] = useState<{ page: number; size: number; dashboardId: number }>({
    dashboardId,
    page: 1,
    size: 20,
  });
  const { isSuccess, data } = useDashboardMembersQuery(param);

  const FilteredMembers =
    (!!keyword
      ? data?.members.filter((member) => member.nickname.includes(keyword))
      : data?.members) || [];

  useEffect(() => {
    if (isSuccess && !!data?.totalCount && data.totalCount > param.size)
      setParam({ ...param, size: data.totalCount });
  }, [isSuccess, data?.totalCount]);

  /**
   * ref 설정 통한 포커싱 설정
   */
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (inputRef.current && !inputRef.current.contains(e.target as HTMLInputElement))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [inputRef, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      const inputElement = document.getElementById('user-dropdown-input');
      if (inputElement) inputElement.focus();
    }
  }, [isOpen]);

  function handleItemClick(assignee: {
    id: number;
    nickname: string;
    profileImageUrl?: string | null;
  }) {
    onChangeAssignee(assignee);
    setIsOpen(false);
  }
  return (
    <div className={cn(styles.dropdownWrapper, styles.inputWrapper)}>
      <label>담당자</label>
      <div className={styles.dropdown} ref={inputRef}>
        <div className={styles.dropdownInputWrapper} onClick={() => setIsOpen(!isOpen)}>
          {!!assignee && !isOpen ? (
            <UserRowItem {...assignee} />
          ) : (
            <input
              type="text"
              id="user-dropdown-input"
              placeholder="이름을 입력해 주세요"
              value={keyword}
              onChange={(e) => setKeyword((e.target as HTMLInputElement).value)}
            />
          )}
          <div className={cn(styles.inputArrow, cond(isOpen, styles.inputArrowActive))} />
        </div>
        {isOpen && (
          <div className={styles.dropdownListWrapper}>
            {isSuccess &&
              FilteredMembers.map(({ userId, nickname, profileImageUrl }: MemberType) => (
                <UserRowItem
                  isActive={assignee?.id === userId}
                  {...{ id: userId, nickname, profileImageUrl, handleItemClick }}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useInvitationsQuery } from '@/api/invitations/invitations.query';
import { InvitationType } from '@/api/invitations/invitations.schema';
import { useDebounce } from '@/hooks/useDebounce';
import { cond } from '@/styles/util/stylesUtil';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/mydashboard.module.scss';
import InvitationRow from './table/InvitationRow';
import SearchInput from './table/SearchInput';
import TableEmpty from './table/TableEmpty';

export default function InvitationTable() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [cursorId, setCursorId] = useState<number>();

  const [keyword, setKeyword] = useState<string>();
  const debouncedKeyword = useDebounce(keyword, 250);

  const [invitationList, setInvitationList] = useState<InvitationType[]>([]);
  const {
    data: invitationsResult,
    isFetching,
    isSuccess,
  } = useInvitationsQuery({
    title: debouncedKeyword || undefined,
    size: 6,
    cursorId,
  });

  useEffect(() => {
    setCursorId(undefined);
  }, [debouncedKeyword]);

  useEffect(() => {
    const newList = invitationsResult?.invitations || [];
    if (!cursorId) setInvitationList(newList);
    else setInvitationList((prev) => [...prev, ...newList]);
  }, [cursorId, invitationsResult]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1 && !!invitationsResult?.cursorId)
            setCursorId(invitationsResult?.cursorId);
        });
      },
      { threshold: 1 },
    );
    if (targetRef.current) observer.observe(targetRef.current as Element);
    return () => observer.disconnect();
  }, [targetRef.current, invitationsResult?.cursorId]);

  return (
    <div className={styles.invitationsContainer}>
      <div className={styles.tableHeader}>
        <h2>초대받은 대시보드</h2>
        {(!!debouncedKeyword || invitationList.length > 0) && (
          <SearchInput {...{ keyword, setKeyword }} />
        )}
      </div>
      {isSuccess &&
        (invitationList.length > 0 ? (
          <div className={styles.invitationsTable}>
            <div className={styles.invitationTableHeader}>
              <label>이름</label>
              <label>초대자</label>
              <label>수락 여부</label>
            </div>
            <div className={styles.invitationList}>
              {invitationList.map((invitation: InvitationType) => (
                <InvitationRow key={invitation.id} {...invitation} />
              ))}
            </div>
          </div>
        ) : (
          <TableEmpty />
        ))}
      <div
        className={cond(!!invitationsResult?.cursorId, styles.invitationLoader)}
        id="infinite-scroll"
        ref={targetRef}
      >
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

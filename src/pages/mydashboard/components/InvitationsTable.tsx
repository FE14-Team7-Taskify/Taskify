import { useInvitationsQuery } from '@/api/invitations/invitations.query';
import { FindInvitationsRequest, InvitationType } from '@/api/invitations/invitations.schema';
import { useDebounce } from '@/hooks/useDebounce';
import { cond } from '@/styles/util/stylesUtil';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/mydashboard.module.scss';
import InvitationRow from './table/InvitationRow';
import SearchInput from './table/SearchInput';
import TableEmpty from './table/TableEmpty';

export default function InvitationTable() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [params, setParams] = useState<FindInvitationsRequest>({ size: 6, title: '' });
  const debouncedKeyword = useDebounce(params.title, 250);

  const [invitationList, setInvitationList] = useState<InvitationType[]>([]);
  const { data: invitationsResult, isFetching } = useInvitationsQuery({
    ...params,
    title: debouncedKeyword || undefined,
  });

  useEffect(() => {
    const newList = invitationsResult?.allInvitations || [];
    if (!params.cursorId) setInvitationList(newList);
    else setInvitationList((prev) => [...prev, ...newList]);
  }, [params.cursorId, invitationsResult?.allInvitations]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([{ isIntersecting, intersectionRatio }]) => {
        if (isIntersecting && intersectionRatio >= 1 && !!invitationsResult?.pages[0].cursorId)
          setParams({ ...params, cursorId: invitationsResult?.pages[0].cursorId });
      },
      { threshold: 1 },
    );
    if (targetRef.current) observer.observe(targetRef.current as Element);
    return () => observer.disconnect();
  }, [invitationsResult?.pages, params]);

  return (
    <div className={styles.invitationsContainer}>
      <div className={styles.tableHeader}>
        <h2>초대받은 대시보드</h2>
        {(!!debouncedKeyword || invitationList.length > 0) && (
          <SearchInput
            keyword={params.title}
            setKeyword={(title) => setParams({ ...params, cursorId: undefined, title })}
          />
        )}
      </div>
      {!isFetching &&
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
        className={cond(!!invitationsResult?.pages[0].cursorId, styles.invitationLoader)}
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

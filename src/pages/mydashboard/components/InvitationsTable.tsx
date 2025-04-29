import { useInvitationsQuery } from '@/api/invitations/invitations.query';
import { InvitationType } from '@/api/invitations/invitations.schema';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/mydashboard.module.scss';

export default function InvitationTable() {
  const [title, setTitle] = useState<string>();
  const [cursorId, setCursorId] = useState<number>();
  const { data: invitationsResult } = useInvitationsQuery({ size: 6, cursorId, title });
  return (
    <div className={styles.invitationsContainer}>
      {invitationsResult?.invitations?.length === 0 ? (
        <>
          <div className={styles.tableHeader}>
            <h2>초대받은 대시보드</h2>
          </div>
          <div className={styles.invitationsTable}>
            <div className={styles.tableEmpty}>
              <Image
                src="/icon/email_unsubscribe.svg"
                alt="초대받은 대시보드 없음 미리보기"
                width={60}
                height={60}
              />
              <h6>아직 초대받은 대시보드가 없어요</h6>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.tableHeader}>
            <h2>초대받은 대시보드</h2>
            <div className={styles.searchTitle}>
              <Image src="/icon/search.svg" alt="검색 아이콘" width={24} height={24} />
              <input
                value={title}
                placeholder="검색"
                onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
              />
            </div>
          </div>
          <div className={styles.invitationsTable}>
            {invitationsResult?.invitations.map((invitation: InvitationType) => (
              <div className={styles.invitationRow}>
                <div>{invitation.dashboard.title}</div>
                <div>{invitation.inviter.nickname}</div>
                <div>
                  <button>수락</button>
                  <button>거절</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

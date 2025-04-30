import { useInvitationsQuery } from '@/api/invitations/invitations.query';
import { InvitationType } from '@/api/invitations/invitations.schema';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/mydashboard.module.scss';
import TableEmpty from './table/TableEmpty';
import SearchInput from './table/SearchInput';

export default function InvitationTable() {
  const [title, setTitle] = useState<string>();
  const [cursorId, setCursorId] = useState<number>();
  const { isSuccess, data: invitationsResult } = useInvitationsQuery({ size: 6, cursorId, title });
  return (
    <div className={styles.invitationsContainer}>
      <div className={styles.tableHeader}>
        <h2>초대받은 대시보드</h2>
        {isSuccess && invitationsResult.invitations?.length > 0 && (
          <SearchInput {...{ title, setTitle }} />
        )}
      </div>
      {isSuccess &&
        (invitationsResult?.invitations?.length > 0 ? (
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
        ) : (
          <TableEmpty />
        ))}
    </div>
  );
}

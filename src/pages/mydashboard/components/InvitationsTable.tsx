import { useInvitationsQuery } from '@/api/invitations/invitations.query';
import { InvitationType } from '@/api/invitations/invitations.schema';
import { useState } from 'react';
import styles from '../styles/mydashboard.module.scss';
import InvitationRow from './table/InvitationRow';
import SearchInput from './table/SearchInput';
import TableEmpty from './table/TableEmpty';

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
              <InvitationRow key={invitation.id} {...invitation} />
            ))}
          </div>
        ) : (
          <TableEmpty />
        ))}
    </div>
  );
}

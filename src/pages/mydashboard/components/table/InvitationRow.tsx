import { InvitationType } from '@/api/invitations/invitations.schema';
import styles from '../../styles/table.module.scss';

export default function InvitationRow(invitation: InvitationType) {
  return (
    <div className={styles.invitationRow}>
      <div>{invitation.dashboard.title}</div>
      <div>{invitation.inviter.nickname}</div>
      <div>
        <button>수락</button>
        <button>거절</button>
      </div>
    </div>
  );
}

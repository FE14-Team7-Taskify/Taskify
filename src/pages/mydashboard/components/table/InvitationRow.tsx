import { useUpdateInvitationMutation } from '@/api/invitations/invitations.query';
import { InvitationType } from '@/api/invitations/invitations.schema';
import styles from '../../styles/table.module.scss';

export default function InvitationRow(invitation: InvitationType) {
  const mutation = useUpdateInvitationMutation();
  function handleButtonClick(accepted: boolean) {
    mutation.mutate({ invitationId: invitation.id, inviteAccepted: accepted });
  }
  return (
    <div className={styles.invitationRow}>
      <div>
        <label>이름</label>
        <div className={styles.invitationTitle}>{invitation.dashboard.title}</div>
      </div>
      <div>
        <label>초대자</label>
        <div>{invitation.inviter.nickname}</div>
      </div>
      <div>
        <div className={styles.invitationBtns}>
          <button onClick={() => handleButtonClick(true)}>수락</button>
          <button onClick={() => handleButtonClick(false)}>거절</button>
        </div>
      </div>
    </div>
  );
}

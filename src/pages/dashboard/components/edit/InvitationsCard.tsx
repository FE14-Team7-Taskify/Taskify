import {
  useDeleteInvitationMutation,
  useInvitationsQuery,
} from '@/api/dashboards/dashboards.query';
import BaseButton from '@/components/common/button/BaseButton';
import Pagination from '@/components/common/button/pagination/Pagination';
import { useOverlay } from '@/contexts/OverlayProvider';
import { cn } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/edit.module.scss';
import CreateInvitationModal from '@/components/modal/CreateInvitationModal';

export default function InvitationsCard({ dashboardId }: { dashboardId: number }) {
  const [param, setParam] = useState<{ page: number; size: number }>({ page: 1, size: 5 });
  const { isSuccess, data } = useInvitationsQuery({ dashboardId, ...param });
  const totalPage = Math.ceil((data?.totalCount || param.size) / param.size);

  const { overlay, close } = useOverlay();
  function handleClickInvite() {
    overlay(<CreateInvitationModal dashboardId={dashboardId} onClose={close} />);
  }

  const mutation = useDeleteInvitationMutation();
  function handleCancelInvitation(invitationId: number) {
    mutation.mutate({ dashboardId, invitationId });
  }
  return (
    <div className={styles.invitationsCard}>
      <div className={styles.headerArea}>
        <div className={cn(styles.header, styles.cardHeader)}>
          <h2 className={styles.headingFont}>초대 내역</h2>
        </div>
        <div className={styles.paginationArea}>
          {totalPage} 페이지 중 {param.page}
          <Pagination
            totalPage={totalPage}
            currentPage={param.page}
            setPage={(page) => setParam({ ...param, page })}
          />
        </div>
        <div className={styles.btnArea}>
          <BaseButton className={styles.btnPrimary} onClick={handleClickInvite}>
            <Image
              src="/icon/add_box_white.svg"
              alt="초대하기 버튼 아이콘 이미지"
              width={14}
              height={14}
            />
            초대하기
          </BaseButton>
        </div>
        <div className={cn(styles.header, styles.tableHeader)}>이메일</div>
      </div>
      {isSuccess &&
        (!data.invitations.length ? (
          <div className={styles.tableEmpty}>
            <Image
              src="/icon/email_unsubscribe.svg"
              alt="대시보드 초대 내역 없음 미리보기"
              width={60}
              height={60}
              priority
            />
            <div className={styles.tableMessage}>아직 대시보드 초대 내역이 없어요</div>
          </div>
        ) : (
          <div className={styles.invitationsTable}>
            {data.invitations.map((invitation) => (
              <div className={styles.invitationRow} key={`invitation-row-${invitation.id}`}>
                {invitation.invitee.email}
                <BaseButton
                  className={styles.btnInvitationRemove}
                  onClick={() => handleCancelInvitation(invitation.id)}
                >
                  취소
                </BaseButton>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

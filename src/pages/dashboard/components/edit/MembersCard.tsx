import { useDashboardMembersQuery, useDeleteMemberMutation } from '@/api/members/members.query';
import BaseButton from '@/components/common/button/BaseButton';
import Pagination from '@/components/common/button/pagination/Pagination';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/edit.module.scss';

export default function MembersCard({ dashboardId }: { dashboardId: number }) {
  const [param, setParam] = useState<{ page: number; size: number }>({ page: 1, size: 5 });
  const { isSuccess, data } = useDashboardMembersQuery({ dashboardId, ...param });
  const totalPage = Math.ceil((data?.totalCount || param.size) / param.size);

  const mutation = useDeleteMemberMutation();
  function handleRemoveMember(id: number) {
    mutation.mutate(id);
  }
  return (
    <div className={styles.membersCard}>
      <div className={styles.header}>
        <h2 className={styles.headingFont}>구성원</h2>
        <div className={styles.paginationArea}>
          {totalPage} 페이지 중 {param.page}
          <Pagination
            totalPage={totalPage}
            currentPage={param.page}
            setPage={(page) => setParam({ ...param, page })}
          />
        </div>
      </div>
      {isSuccess && !!data && (
        <div className={styles.membersTable}>
          <div className={styles.header}>이름</div>
          <div className={styles.tableContent}>
            {data.members.map((member) => (
              <div className={styles.memberRow} key={`member-row-${member.id}`}>
                <div className={styles.profileWrapper}>
                  <div className={styles.imageWrapper}>
                    {member.profileImageUrl ? (
                      <img
                        src={member.profileImageUrl}
                        alt={`구성원 ${member.nickname} 프로필 이미지`}
                      />
                    ) : (
                      <Image src="/images/profile.svg" alt="구성원 프로필 미리보기" fill />
                    )}
                  </div>
                  {member.nickname}
                </div>
                <BaseButton
                  className={styles.btnMemberRemove}
                  onClick={() => handleRemoveMember(member.id)}
                >
                  삭제
                </BaseButton>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

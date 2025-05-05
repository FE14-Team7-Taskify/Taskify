'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './styles/mypage.module.scss';
import PasswordCheck from './passwordCheck';
import ProfileCheck from './profileCheck';
import type { GetMyInfoResponse } from '@/api/users/users.schema';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function MyPage() {
  const [myInfo, setMyInfo] = useState<GetMyInfoResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchMyInfo() {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await axios.get('https://sp-taskify-api.vercel.app/14-7/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        });
        setMyInfo(response.data);
      } catch (error) {
        console.log('에러', error);
      }
    }
    fetchMyInfo();
  }, []);

  useEffect(() => {
    console.log('myInfo 바뀜:', myInfo);
  }, [myInfo]);

  //if (!user) return <div>로딩 중...</div>;

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      <div>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image
            src="/icon/arrow_right.svg"
            width={16}
            height={16}
            alt="뒤로가기"
            style={{ transform: 'rotate(180deg)', verticalAlign: 'middle' }}
          />
          <span className={styles.text}>돌아가기</span>
        </button>
      </div>
      <ProfileCheck
        email={myInfo?.email as string}
        imgUrl={myInfo?.profileImageUrl as string}
        nickname={myInfo?.nickname as string}
      />
      <PasswordCheck />
      {/* <p>이메일: {user.email}</p>
      <p>닉네임: {user.nickname}</p> */}
      {/* <img src={user.profileImage} alt="프로필" /> */}
    </div>
  );
}

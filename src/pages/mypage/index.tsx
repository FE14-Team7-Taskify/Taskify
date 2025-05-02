'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './styles/mypage.module.scss';
import PasswordCheck from './passwordCheck';
import ProfileCheck from './profileCheck';
import type { GetMyInfoResponse } from '@/api/auth/auth.schema';
import axios from 'axios';

export default function MyPage() {
  // const [user, setUser] = useState(null);
  //const fileInputRef = useRef(null);
  const [myInfo, setMyInfo] = useState<GetMyInfoResponse | null>(null);

  useEffect(() => {
    //const token = localStorage.getItem('accessToken');

    // if (!token) {
    //   alert('로그인이 필요합니다.');
    //   window.location.href = '/login';
    //   return;
    // }

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
        setMyInfo({ message: '정보를 불러오는 데 실패했습니다.' });
        console.log('에러', error);
      }
    }
    fetchMyInfo();

    const fetchUser = async () => {
      //   try {
      //     const res = await axiosInstance.get('/api/user/me');
      //     setUser(res.data);
      //   } catch (error) {
      //     console.error('유저 정보 불러오기 실패', error);
      //     alert('세션이 만료되었거나 잘못된 접근입니다.');
      //     window.location.href = '/login';
      //   }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log('myInfo 바뀜:', myInfo);
  }, [myInfo]);

  //if (!user) return <div>로딩 중...</div>;

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      <div>
        <button className={styles.backButton}>
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
        email={myInfo?.email}
        imgUrl={myInfo?.profileImageUrl}
        nickname={myInfo?.nickname}
      />
      <PasswordCheck />
      {/* <p>이메일: {user.email}</p>
      <p>닉네임: {user.nickname}</p> */}
      {/* <img src={user.profileImage} alt="프로필" /> */}
    </div>
  );
}

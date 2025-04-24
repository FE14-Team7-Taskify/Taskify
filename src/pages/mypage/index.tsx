'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles/mypage.module.scss';

export default function MyPage() {
  // const [user, setUser] = useState(null);

  useEffect(() => {
    //const token = localStorage.getItem('accessToken');

    // if (!token) {
    //   alert('로그인이 필요합니다.');
    //   window.location.href = '/login';
    //   return;
    // }

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

  //if (!user) return <div>로딩 중...</div>;

  return (
    <div>
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
      <div>
        <div className={styles.headfont}>프로필</div>
        <div className={styles.rowWrapper}>
          <button className={styles.profileButton}></button>
          <div>
            <form action="/submit-url" method="POST" className={styles.formBox}>
              <div>
                이메일
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="temp@naver.com"
                    className={styles.inputBox}
                  />
                </div>
              </div>
              <div>
                <div>닉네임</div>
                <input
                  type="password"
                  name="password"
                  placeholder="배유철"
                  className={styles.inputBox}
                />
              </div>
            </form>
            <button className={styles.saveChangeButton}>저장</button>
          </div>
        </div>
      </div>
      <div className={styles.passwordBox}>
        <div className={styles.headfont}>비밀번호 변경</div>
        <div>
          <form action="/submit-url" method="POST" className={styles.formBox}>
            <div>
              현재 비밀번호
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호 입력"
                  className={styles.inputBox}
                />
              </div>
            </div>
            <div>
              <div>새 비밀번호</div>
              <input
                type="password"
                name="password"
                placeholder="새 비밀번호 입력"
                className={styles.inputBox}
              />
            </div>
            <div>
              <div>새 비밀번호 확인</div>
              <input
                type="password"
                name="password"
                placeholder="새 비밀번호 입력"
                className={styles.inputBox}
              />
            </div>
          </form>
          <button className={styles.saveChangeButton}>변경</button>
        </div>
      </div>

      {/* <p>이메일: {user.email}</p>
      <p>닉네임: {user.nickname}</p> */}
      {/* <img src={user.profileImage} alt="프로필" /> */}
    </div>
  );
}

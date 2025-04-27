import LoginButton from '@/components/loginButton/LoginButton';
import ModalButton from '@/components/modalButton/ModalButton';
import MyDashBoardButton from '@/components/myDashBoradButton/MyDashBoardButton';

export default function Home() {
  return (
    <>
      <div>
        <LoginButton>로그인</LoginButton>
      </div>
      <div>
        <ModalButton leftText="취소" rightText="생성" />
      </div>
      <div>
        <MyDashBoardButton leftText="수락" rightText="거절" />
      </div>
    </>
  );
}

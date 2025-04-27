import LoginButton from '@/components/loginButton/LoginButton';
import ModalButton from '@/components/modalButton/ModalButton';

export default function Home() {
  return (
    <>
      <div>
        <LoginButton>로그인</LoginButton>
      </div>
      <div>
        <ModalButton cancelText="취소" confirmText="생성" />
      </div>
    </>
  );
}

import { useLoginMutation } from '@/api/auth/auth.query';

export default function Home() {
  const loginMutation = useLoginMutation();
  function onClickLogin() {
    loginMutation.mutate({ email: 'callu_9ine@naver.com', password: 'asdasdasdasd' }); // 로그인을 원하는 이메일 및 비밀번호로 작성해주세요
  }
  return (
    <>
      <div>랜딩페이지 (테스트 중입니다!)</div>
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
}

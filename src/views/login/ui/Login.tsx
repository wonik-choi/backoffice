import LoginForm from '@/views/login/ui/LoginForm';

const Login = () => {
  return (
    <section className="size-full flex items-center justify-center">
      <div className="w-full max-w-[40rem] flex flex-col items-center justify-start gap-[2rem]">
        <h1 className="text-[2.3rem] font-bold text-cetner  text-susimdal-text-basic">관리자 페이지</h1>
        <p className="text-[1.6rem] font-semibold text-center mb-[2rem] text-susimdal-text-primary">
          추후 업데이트 예정
        </p>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;

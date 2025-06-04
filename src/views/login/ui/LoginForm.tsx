'use client';

import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// shared
import { Button, Em, Input, Label } from '@/shared/components/ui';
import { ServerCustomError } from '@/shared/lib/errors/errors';

// features
import { loginSchema, LoginSchema } from '@/features/authentication/config/schema';
import { usePostLogin } from '@/features/authentication/services/query/usePostLogin';

const LoginForm = () => {
  const router = useRouter();

  const defaultValues: LoginSchema = {
    username: '',
    password: '',
  };

  const { postLogin, isPending } = usePostLogin({
    onSuccessCallback: () => {
      router.replace('/home');
    },
    onErrorCallback: (error: Error) => {
      if (error instanceof ServerCustomError) {
        toast.error(`[${error ? error.status : 'ERROR'}]이런! 로그인에 실패했어요`, {
          description: error ? error.debug.message : '개발자 문의 필요',
          duration: 6000,
        });
      } else {
        toast.error(`[ERROR]이런! 로그인에 실패했어요`, {
          description: error ? error.message : `개발자 문의 필요`,
          duration: 6000,
        });
      }
    },
  });

  const form = useForm({
    defaultValues,
    onSubmit: (data) => {
      console.log(data);
      postLogin({
        username: data.value.username,
        password: data.value.password,
      });
    },
    validators: {
      onMount: loginSchema,
      onChange: loginSchema,
    },
  });

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="w-full"
    >
      <div className="flex flex-col items-start justify-center gap-[0.7rem] w-full">
        <form.Field name="username">
          {(field) => {
            return (
              <div className="flex flex-col items-start justify-center gap-[0.7rem] w-full">
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input
                  id={field.name}
                  placeholder="아이디 입력"
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  className="w-full bg-white"
                />
                <div className="w-full h-[1.2rem]">
                  {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                  )}
                </div>
              </div>
            );
          }}
        </form.Field>
        <form.Field name="password">
          {(field) => {
            return (
              <div className="flex flex-col items-start justify-center gap-[0.7rem] w-full">
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input
                  id={field.name}
                  placeholder="비밀번호 입력"
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="password"
                  className="w-full bg-white"
                />
                <div className="w-full h-[1.2rem]">
                  {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                  )}
                </div>
              </div>
            );
          }}
        </form.Field>
        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <div className="flex justify-center gap-[0.8rem] w-full">
              <Button type="submit" disabled={!canSubmit} loading={isPending}>
                {'로그인'}
              </Button>
            </div>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};

export default LoginForm;

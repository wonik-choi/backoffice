import { TodoList } from '@/shared/components/Todo';
import { UserForm } from '@/shared/components/UserForm';

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center">Next.js 라이브러리 테스트</h1>
        <p className="text-center text-gray-600 mt-2">주요 라이브러리 셋업 및 테스트 예제</p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Todo 앱 (Zustand + Zod)</h2>
          <TodoList />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">사용자 폼 (Zod 검증)</h2>
          <UserForm />
        </section>
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-gray-500 text-sm">
        <p>Next.js, Zustand, Shadcn UI, Tailwind CSS, TypeScript, Zod 사용</p>
      </footer>
    </div>
  );
}

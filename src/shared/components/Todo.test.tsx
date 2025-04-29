import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './Todo';
import { useTodoStore } from '@/store/todoStore';
import { Todo } from '@/store/todoStore';
import '@testing-library/jest-dom';

// useTodoStore 모킹
jest.mock('@/store/todoStore', () => ({
  useTodoStore: jest.fn(),
}));

describe('TodoList', () => {
  // 각 테스트 전에 모킹된 스토어 상태와 액션 설정
  beforeEach(() => {
    const mockTodos: Todo[] = [];
    const mockAddTodo = jest.fn((text) => {
      mockTodos.push({ id: `test-${Date.now()}`, text, completed: false });
    });
    const mockToggleTodo = jest.fn((id) => {
      const todo = mockTodos.find((t) => t.id === id);
      if (todo) todo.completed = !todo.completed;
    });
    const mockDeleteTodo = jest.fn((id) => {
      const index = mockTodos.findIndex((t) => t.id === id);
      if (index !== -1) mockTodos.splice(index, 1);
    });

    // 모킹된 스토어 구현
    (useTodoStore as unknown as jest.Mock).mockImplementation(() => ({
      todos: mockTodos,
      addTodo: mockAddTodo,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
    }));
  });

  it('renders the TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText('할 일 목록')).toBeInTheDocument();
  });

  it('adds a new todo when the add button is clicked', () => {
    // 스토어 구현을 추가 기능이 동작하도록 재설정
    const mockTodos: Todo[] = [];
    const mockAddTodo = jest.fn((text) => {
      mockTodos.push({ id: 'test-id', text, completed: false });
      // 스토어 업데이트 후 다시 렌더링되도록 useTodoStore 구현 업데이트
      (useTodoStore as unknown as jest.Mock).mockImplementation(() => ({
        todos: mockTodos,
        addTodo: mockAddTodo,
        toggleTodo: jest.fn(),
        deleteTodo: jest.fn(),
      }));
    });

    (useTodoStore as unknown as jest.Mock).mockImplementation(() => ({
      todos: mockTodos,
      addTodo: mockAddTodo,
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    }));

    render(<TodoList />);

    // 새 할 일 입력
    const input = screen.getByPlaceholderText('할 일을 입력하세요');
    fireEvent.change(input, { target: { value: '새로운 할 일' } });

    // 추가 버튼 클릭
    const addButton = screen.getByText('추가');
    fireEvent.click(addButton);

    // addTodo가 호출되었는지 확인
    expect(mockAddTodo).toHaveBeenCalledWith('새로운 할 일');
  });

  it('toggles a todo when checkbox is clicked', () => {
    // 이미 할 일이 있는 상태로 시작
    const mockTodos: Todo[] = [{ id: 'test-id', text: '완료할 일', completed: false }];
    const mockToggleTodo = jest.fn();

    (useTodoStore as unknown as jest.Mock).mockImplementation(() => ({
      todos: mockTodos,
      addTodo: jest.fn(),
      toggleTodo: mockToggleTodo,
      deleteTodo: jest.fn(),
    }));

    render(<TodoList />);

    // 체크박스 찾기
    const checkbox = screen.getByRole('checkbox');

    // 체크박스 클릭
    fireEvent.click(checkbox);

    // toggleTodo가 호출되었는지 확인
    expect(mockToggleTodo).toHaveBeenCalledWith('test-id');
  });

  it('deletes a todo when delete button is clicked', () => {
    // 이미 할 일이 있는 상태로 시작
    const mockTodos: Todo[] = [{ id: 'test-id', text: '삭제할 일', completed: false }];
    const mockDeleteTodo = jest.fn();

    (useTodoStore as unknown as jest.Mock).mockImplementation(() => ({
      todos: mockTodos,
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      deleteTodo: mockDeleteTodo,
    }));

    render(<TodoList />);

    // 삭제 버튼 찾기
    const deleteButton = screen.getByText('삭제');

    // 삭제 버튼 클릭
    fireEvent.click(deleteButton);

    // deleteTodo가 호출되었는지 확인
    expect(mockDeleteTodo).toHaveBeenCalledWith('test-id');
  });
});

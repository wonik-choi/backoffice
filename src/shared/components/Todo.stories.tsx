import type { Meta, StoryObj } from '@storybook/react';
import { TodoList } from './Todo';

// Todo 컴포넌트의 메타데이터
const meta: Meta<typeof TodoList> = {
  title: 'Components/TodoList',
  component: TodoList,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TodoList>;

// 기본 상태의 Todo 리스트
export const Default: Story = {
  args: {},
};

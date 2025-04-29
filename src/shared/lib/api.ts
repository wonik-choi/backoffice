'use client';

import ky from 'ky';
import { z } from 'zod';

// API 기본 설정
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {
        // 인증 토큰 추가 (예시)
        const token = localStorage.getItem('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // 응답 처리 (예시: 401 응답 시 로그아웃)
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return response;
      },
    ],
  },
});

// 사용자 스키마
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
});

type User = z.infer<typeof UserSchema>;

// 사용자 목록 응답 스키마
const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

// API 함수
export const userApi = {
  // 사용자 목록 조회
  getUsers: async (page = 1, limit = 10): Promise<z.infer<typeof UsersResponseSchema>> => {
    try {
      const response = await api
        .get('users', {
          searchParams: { page, limit },
        })
        .json();

      return UsersResponseSchema.parse(response);
    } catch (error) {
      console.error('사용자 목록 조회 실패:', error);
      throw error;
    }
  },

  // 사용자 상세 조회
  getUser: async (id: number): Promise<User> => {
    try {
      const response = await api.get(`users/${id}`).json();

      return UserSchema.parse(response);
    } catch (error) {
      console.error(`사용자(ID: ${id}) 조회 실패:`, error);
      throw error;
    }
  },

  // 사용자 생성
  createUser: async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    try {
      const response = await api
        .post('users', {
          json: userData,
        })
        .json();

      return UserSchema.parse(response);
    } catch (error) {
      console.error('사용자 생성 실패:', error);
      throw error;
    }
  },

  // 사용자 수정
  updateUser: async (id: number, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> => {
    try {
      const response = await api
        .put(`users/${id}`, {
          json: userData,
        })
        .json();

      return UserSchema.parse(response);
    } catch (error) {
      console.error(`사용자(ID: ${id}) 수정 실패:`, error);
      throw error;
    }
  },

  // 사용자 삭제
  deleteUser: async (id: number): Promise<void> => {
    try {
      await api.delete(`users/${id}`);
    } catch (error) {
      console.error(`사용자(ID: ${id}) 삭제 실패:`, error);
      throw error;
    }
  },
};

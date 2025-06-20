import { editFreeTrialUserService } from '@/features/edit-free-trial-student/services/context/EditFreetrialUserService';

describe('EditFreeTrialUserService.diff', () => {
  describe('동일한 객체를 비교할 때', () => {
    it('빈 객체를 반환해야 한다', () => {
      const initial = { id: 1, name: 'Alice', age: 20 };
      const current = { id: 1, name: 'Alice', age: 20 };

      const result = editFreeTrialUserService.diff(initial, current);

      expect(result).toEqual({});
    });

    it('id 필드만 있고 변경되지 않았을 때 빈 객체를 반환해야 한다', () => {
      const initial = { id: 5, title: 'Old' };
      const current = { id: 5, title: 'Old' };

      const result = editFreeTrialUserService.diff(initial, current);

      expect(result).toEqual({});
    });
  });

  describe('기본 타입 필드가 변경되었을 때', () => {
    it('변경된 필드와 id를 포함해서 반환해야 한다', () => {
      const initial = { id: 2, name: 'Bob', active: true };
      const current = { id: 2, name: 'Robert', active: true };

      const result = editFreeTrialUserService.diff(initial, current);

      expect(result).toEqual({ id: 2, name: 'Robert' });
    });
  });

  describe('중첩된 객체를 비교할 때', () => {
    it('변경된 중첩 필드만 포함해서 반환해야 한다', () => {
      const initial = { id: 3, address: { city: 'X', zip: '00000' } };
      const current = { id: 3, address: { city: 'Y', zip: '00000' } };

      const result = editFreeTrialUserService.diff(initial, current);

      expect(result).toEqual({ id: 3, address: { city: 'Y' } });
    });

    it('중첩된 객체가 동일할 때 빈 객체를 반환해야 한다', () => {
      const initial = { id: 4, item: { id: 10, value: 'A' } };
      const current = { id: 4, item: { id: 10, value: 'A' } };

      const result = editFreeTrialUserService.diff(initial, current);

      expect(result).toEqual({});
    });
  });

  describe('배열을 비교할 때', () => {
    it('변경된 배열을 포함해서 반환해야 한다', () => {
      const initial = { id: 6, tags: ['a', 'b'] };
      const current = { id: 6, tags: ['a', 'c'] };

      const result = editFreeTrialUserService.diff(initial, current);

      expect(result).toEqual({ id: 6, tags: ['a', 'c'] });
    });

    it('동일한 배열일 때 빈 객체를 반환해야 한다', () => {
      const initial = { id: 7, tags: [1, 2, 3] };
      const current = { id: 7, tags: [1, 2, 3] };

      const result = editFreeTrialUserService.diff(initial, current);

      expect(result).toEqual({});
    });
  });
});

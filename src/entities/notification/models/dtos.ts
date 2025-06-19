import { NotificationType } from '@/entities/notification/models/enums';

export interface NotificationDto {
  id: number;
  type: NotificationType;
  isSuccess: boolean;
  createdAt: string;
}

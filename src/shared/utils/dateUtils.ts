import dayjs from 'dayjs';

export const formatDateTime = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

export const formatDate = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const formatTime = (date: string): string => {
  return dayjs(date).format('HH:mm:ss');
};

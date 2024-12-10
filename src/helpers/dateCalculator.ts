import dayjs from "dayjs";

export const daysSinceCreation = (createdAt: Date): number => {
  const createdDate = dayjs(createdAt);
  const currentDate = dayjs();
  return currentDate.diff(createdDate, "day");
};

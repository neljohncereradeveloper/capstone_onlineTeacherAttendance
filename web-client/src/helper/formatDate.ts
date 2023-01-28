function padTo2Digits(num: any) {
  return num.toString().padStart(2, '0');
}

export const formatDate = (date: Date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
};

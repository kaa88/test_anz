export const debounce = (callback: (...args: any) => any, timeout?: number) => {
  const t = timeout || 500;
  let id: NodeJS.Timeout;
  return () => {
    clearTimeout(id);
    id = setTimeout(() => callback(), t);
  };
};

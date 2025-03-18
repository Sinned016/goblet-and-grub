export const isFieldEmpty = (field: string | string[]) => {
  if (Array.isArray(field)) {
    return field.length === 0;
  }
  return !field.trim();
};

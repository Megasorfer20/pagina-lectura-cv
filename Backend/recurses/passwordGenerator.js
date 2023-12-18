export const generatePassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.?¿!,+*";
  let password = "";
  for (let i = 0; i < length; ++i) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}
export const generatePassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.?¿!,+*";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset[Math.floor(Math.random() * n)];
    }
    return password;
  }
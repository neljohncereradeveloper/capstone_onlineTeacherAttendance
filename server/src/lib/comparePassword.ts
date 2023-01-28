import bcrypt from 'bcryptjs';
export const comparePassword = async (password: any, hash: any) => {
  try {
    // Compare password
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
  }

  return false;
};

import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds, a higher number means more secure but slower

export async function hashPassword(plainPassword: string) {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Password encryption failed');
    }
}
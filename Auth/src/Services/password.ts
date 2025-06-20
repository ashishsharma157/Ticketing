import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    // Static method to compare a plain text password with a hashed password
    static async  compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buff = (await scryptAsync(suppliedPassword, salt, 64) as Buffer);

        return buff.toString('hex') === hashedPassword;
    }

    // Static method to hash a plain text password
    static async toHash(password: string) {
        // const bcrypt = require('bcryptjs');
        // const salt = await bcrypt.genSalt(10);
        // return await bcrypt.hash(password, salt);
        const salt=randomBytes(8).toString('hex');
        const buff = (await scryptAsync(password, salt, 64) as Buffer);

        return `${buff.toString('hex')}.${salt}`;
    }
}
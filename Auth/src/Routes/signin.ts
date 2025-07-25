import express, {Request, Response} from 'express';
import { body } from 'express-validator';

import {User} from '../Models/user';
import { validateRequest, BadRequestError } from '@minttickets/common';

import { Password } from '../Services/password';
import  jwt  from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin',[
    body('email').isEmail()
    .withMessage('Email must be valid'),
    body('password').trim().notEmpty()
    .withMessage('Password must be specified')
], validateRequest ,
async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
    }

    //    const user = User.build({
    //         email, password});
    //     await user.save().catch((err) => {
    //         console.error('Error saving user:', err);
    //     });
    
    
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);
        
    
        req.session = {jwt: userJwt};
        res.status(200).send(existingUser);

    
});

export { router as signinRouter  };
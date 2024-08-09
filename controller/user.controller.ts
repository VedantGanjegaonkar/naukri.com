import { Request, Response,NextFunction } from 'express';
import { IUser } from '../interface';
import { errorHandler } from '../middleware/errorhandler';
import { inject } from 'inversify';
import { controller, httpPost, next } from 'inversify-express-utils';
import { TYPES } from '../types';
import { UserService } from '../services/user.services';


@controller('/user')
export class UserController {
    

    constructor(@inject(TYPES.UserService) private readonly _userService: UserService) {}

    @httpPost('/signup')
    public async signup(req: Request, res: Response): Promise<void> {
        const { username, email, password, role,company,branch,qualification } = req.body;
        const createUserParams = { username, email, password, role,company,branch,qualification  };

        try {
         const user=await this._userService.createUser(createUserParams)
            

        res.status(201).json({ message: 'User created successfully', user });
        } catch (error:any) {
           errorHandler(error,req,res,next)
        }
    }

    @httpPost('/login')
    public async login(req: Request, res: Response, next:NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            const user = await this._userService.findUserByEmail(email);
          
            await this._userService.validatePassword(password, user.password);
            
            const token = this._userService.generateAuthToken(user._id.toString(), user.role);

            res.status(200).json({ message: 'Login successful', token });
        } catch (err: any) {
            errorHandler(err,req,res,next)
        }
    }
}



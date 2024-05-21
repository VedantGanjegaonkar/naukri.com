import { Request, Response } from 'express';
import { UserDocument, UserModel } from '../models/user.model';
import {RecruterModel} from '../models/recruterDetails.model';
import { UserDetailsModel } from '../models/userDetails.model';
import bcrypt from 'bcrypt';

export class UserController {
    public async signup(req: Request, res: Response): Promise<void> {
        const { username, email, password, role } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password,10);

            // Create the user based on the role
    
            const user = new UserModel({ username, email, password: hashedPassword, role });
            await user.save();

            if (role === 'recruiter') {
                console.log("hello recruiter");
                console.log (user._id.toString());
                
                await RecruterModel.create({ userId: user._id.toString(), company: req.body.company });
            } else {
                console.log("hello user");
                
                await UserDetailsModel.create({ userId: user._id.toString(), qualification: req.body.qualification, branch:req.body.branch });
            }

            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}



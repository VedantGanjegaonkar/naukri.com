        import { Document, Schema, model,models } from 'mongoose';
import { IUser } from '../interface';



const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true ,unique:true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'recruiter', 'user'], required: true }
});

const User = models.User || model<IUser>('User', userSchema);

export { User} ;

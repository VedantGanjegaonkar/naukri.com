import { Document, Schema, model,models } from 'mongoose';


interface UserDocument extends Document {
    _id: Schema.Types.ObjectId; 
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'recruiter' | 'user';
}


const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    email: { type: String, required: true ,unique:true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'recruiter', 'user'], required: true }
});

const UserModel = models.User || model<UserDocument>('User', userSchema);

export {UserDocument, UserModel} ;

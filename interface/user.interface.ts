import { Document, Schema, model,models } from 'mongoose';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId; 
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'recruiter' | 'user';
}
import{Document} from "mongoose"
import { IUser } from "./user.interface";


export interface Irecruiter extends Document{
    userId: IUser['_id'];
    company:string   
}
import{Document} from "mongoose"
import{UserDocument} from "../models/user.model"


export interface Irecruiter extends Document{
    userId: UserDocument['_id'];
    company:string
    
}
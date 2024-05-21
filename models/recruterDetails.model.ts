import{model,Schema,models} from "mongoose"
import {Irecruiter} from "../interface/index";


const recruiterSchema = new Schema<Irecruiter>({

    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    company:{ type: String, required: true }

})

const RecruterModel = models.RecruiterDetails  || model<Irecruiter>('recruiter', recruiterSchema);
export {RecruterModel} ;

import { Schema, model, Document, Types } from 'mongoose';

interface IApplication {
  applicant: Types.ObjectId;
  resume?: string;
  appliedDate: Date;
}

interface IJobPost extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: number;
  employmentType?: 'Full-Time' | 'Part-Time' | 'Contract' | 'Temporary' | 'Internship';
  postedDate: Date;
  skills: string[];
  recruiter: Types.ObjectId;
  applications: IApplication[];
  qualification: string;
  branch: string;
}

const applicationSchema = new Schema<IApplication>({
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: {
    type: String,
    required: false
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
});

const jobPostSchema = new Schema<IJobPost>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: false
  },
  employmentType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship'],
    required: false
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  skills: [
    {
      type: String,
      required: true
    }
  ],
  recruiter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  qualification: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  applications: [applicationSchema]


},
{
    timestamps:true
});

const Application = model<IApplication>('Application', applicationSchema);
const JobPost = model<IJobPost>('JobPost', jobPostSchema);


export {JobPost,IJobPost, Application};


// {
//     "title": "electrician",
//     "description": "We are looking for a skilled chemical tester to join our team.",
//     "company": "lupin",
//     "location": "halol",
//     "salary": 190000,
//     "employmentType": "Part-Time",
//     "skills": ["chemical", "hcl", "php"],
//     "recruiter": "664c8c74a8e4289c282a7fb5",
//     "qualification": "iti",
//     "branch": "any"
//   }
  
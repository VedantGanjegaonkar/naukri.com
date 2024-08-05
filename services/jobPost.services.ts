import {JobPost,IJobPost} from '../models/jobPost.model';
import { Schema, model, Document, Types } from 'mongoose';
import{ValidationError,NotFoundError} from "../utils/errors"


interface JobPostData {
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: number;
  employmentType?: 'Full-Time' | 'Part-Time' | 'Contract' | 'Temporary' | 'Internship';
  skills: string[];
  recruiter: Types.ObjectId;
  qualification: string;
  branch: string;
}

export class JobPostServices{


public async createJobPost(jobPostData: JobPostData):Promise<IJobPost>{
    const { title, description, company, location, salary, employmentType, skills, recruiter, qualification, branch } = jobPostData;
  
    const newJobPost = new JobPost({
      title,
      description,
      company,
      location,
      salary,
      employmentType,
      skills,
      recruiter,
      qualification,
      branch
    });
  
    await newJobPost.save();
    return newJobPost;
  };

  public async updateJobPost(jobPostId:string,jobPostData:IJobPost):Promise<IJobPost>{
    
    const updatedJobPost = await JobPost.findByIdAndUpdate(jobPostId, jobPostData, { new: true });
    if (!updatedJobPost) {
      throw new NotFoundError('Job post not found');
    }
    return updatedJobPost;

  }

  public async deleteJobPost(jobPostId:any):Promise<void>{

    const deletedJobPost= await JobPost.findOne({_id:jobPostId})
    console.log(deletedJobPost);
    
    if (!deletedJobPost) {
      throw new NotFoundError('Job post not found to delete');
    }

    await JobPost.findByIdAndDelete(jobPostId)

  }
  

}

import { Request, Response, NextFunction} from 'express';
import {JobPost,IJobPost} from '../models/jobPost.model';
import { JobPostServices } from '../services/jobPost.services';
import{errorHandler} from "../middleware/errorhandler"
import { inject } from 'inversify';
import { TYPES } from '../types';
import { controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';

@controller('/jobPost')

export class jobPostController{

    constructor(@inject(TYPES.JobPostServices) private readonly jobPostServices: JobPostServices ){}


@httpPost('/')
public async createJobPost(req: Request, res: Response, next:NextFunction): Promise<void>{
    try {
        const jobPostData = req.body;

       const newJobPost= await this.jobPostServices.createJobPost(jobPostData)
      
  
      res.status(201).json({ message: 'Job post created successfully', jobPost: newJobPost });
    } catch (err:any) {
      errorHandler(err,req,res,next)
    }
  };
  
@httpDelete('/')
public async deleteJobPost(req: Request, res: Response, next:NextFunction):Promise<void>{
    try {

        const jobPostId=req.params.id

        await this.jobPostServices.deleteJobPost(jobPostId)
        
        res.status(200).json({ message: 'Job post deleted successfully' });
        
    } catch (err:any) {
        errorHandler(err,req,res,next)
    }
}
@httpGet('/')
public async getAllJobs(req: Request, res: Response, next:NextFunction):Promise<void>{
    try {

        const jobPosts=await this.jobPostServices.getAllJobs()
        
        
        res.status(200).json(jobPosts);
        
    } catch (err:any) {
        errorHandler(err,req,res,next)
    }
}

@httpGet('/:id')
public async getpost(req: Request, res: Response, next:NextFunction):Promise<void>{
    try {
        const{id}=req.params

        const jobPost=await this.jobPostServices.viewDetailPost(id)
        res.status(200).json(jobPost);
        
    } catch (err:any) {
        errorHandler(err,req,res,next)
    }
}



}


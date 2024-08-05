import { Request, Response, NextFunction } from 'express';
import { Application,JobPost } from '../models/jobPost.model';
import { UserModel } from '../models/user.model';
import { Types } from 'mongoose';
import { AppError } from '../utils/errors'; 

export class ApplicationController{

    
public async applyForJobPost(req: Request, res: Response, next: NextFunction){
    try {
      const jobPostId = req.params.id;
      const { userId, resume} = req.body;
      
        
      // Validate user
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      console.log(jobPostId);
      
  
      // Validate job post
      const jobPost = await JobPost.findById(jobPostId);
      if (!jobPost) {
        throw new AppError('Job post not found', 404);
      }
      
      // Create new application
      const newApplication = new Application({
        applicant: userId,
        resume,
      });
  
      // Save application
      const savedApplication = await newApplication.save();

      console.log(savedApplication.id,savedApplication);
      
  
      // Add application to job post
      jobPost.applications.push(savedApplication);
      await jobPost.save();
  
      res.status(201).json({
        status: 'success',
        data: {
          application: savedApplication,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public async deleteJobApplication(req: Request, res: Response, next: NextFunction){

    try {
        const jobPostId= req.params.id;
        const {applicationId} = req.body; 
        // console.log(applicationId);
                  
    
        // Validate application
        // const application = await Application.findById(applicationId);
        // if (!application) {
        //   throw new AppError('Application not found', 404);
        // }
    
        // Validate job post
        const jobPost = await JobPost.findById(jobPostId);
        if (!jobPost) {
          throw new AppError('Job post not found', 404);
        }
    // const _id= new Types.ObjectId(applicationId as string);
        // Check if application belongs to the job post
    //    // Convert applicantId to a mongoose ObjectId
    // const applicantObjectId = new Types.ObjectId(applicationId);

    // console.log(applicantObjectId.toString());
    
    // Find the application by applicant ID
    console.log(jobPost.applications.map(application => application.applicant.toString() === applicationId));
     
    // const applicationIndex = jobPost.applications.findIndex(
    //   (application: any) => {
    //     console.log(application.applicant.toString());
    //     return application.applicant.toString() === applicationId});
    
    // console.log(applicationIndex);
    
        
        // if (applicationIndex === -1) {
        //   throw new AppError('Application does not belong to the specified job post', 400);
        // }
    
        // Remove application from job post
        // jobPost.applications.splice(applicationIndex, 1);
        // await jobPost.save();
    
        // Delete application
        // await Application.findByIdAndDelete(applicationId);
    
        res.status(200).json({
          status: 'success',
          message: 'Application deleted successfully',
        });
      } catch (error) {
        next(error);
      }

  }
}


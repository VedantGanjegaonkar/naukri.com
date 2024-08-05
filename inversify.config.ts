import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { UserService } from './services/user.services';
import { UserController } from './controller/user.controller';
import {RoleController} from './controller/role.controller';
import { JobPostServices } from './services/jobPost.services';
import { jobPostController } from './controller/jobPost.controller';
import { ApplicationController } from './controller/application.controller';

const container = new Container();

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(UserController).to(UserController);

container.bind<RoleController>(RoleController).to(RoleController);

container.bind<JobPostServices>(TYPES.JobPostServices).to(JobPostServices);
container.bind<jobPostController>(jobPostController).to(jobPostController);


container.bind<ApplicationController>(ApplicationController).to(ApplicationController);



export { container };

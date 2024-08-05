import { Request, Response } from 'express';
import { Role, RoleInterface } from '../models/role.model'; // Adjust the import path as needed
import { controller, httpPost, next } from 'inversify-express-utils';

@controller('/role')
export class RoleController {
  // Method to create a new role

  @httpPost('/')
  public async createRole(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body;

      // Check if the role already exists
      const existingRole = await Role.findOne({ role });
      if (existingRole) {
        res.status(400).json({ message: 'Role already exists' });
        return;
      }

      // Create a new role
      const newRole = new Role({ role });
      await newRole.save();

      res.status(201).json({ message: 'Role created successfully', data: newRole });
    } catch (error:any) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
}



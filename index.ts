import 'reflect-metadata';
import * as express from 'express';
import mongoose from 'mongoose';
import * as cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.config';

const port = 3000

mongoose.connect('mongodb+srv://vedantsg112233:MzUFmOl5GA6oCL77@cluster0.rfaqwkb.mongodb.net/naukri_lite?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('connected to DB');
  });

  const server = new InversifyExpressServer(container)

  server.setConfig((app)=>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
  })

  const app = server.build();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  
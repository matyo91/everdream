import * as bodyParser from 'body-parser';
import {NextFunction, Request, Response} from "express";
import { errors, isCelebrate } from 'celebrate';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import routes from '../api/routes';
import config from '../config';

export default (app: express.Application, staticMiddleware: any) => {
  app.enable('trust proxy');
  app.use(cors({
    "origin": config.get('corsAllowOrigin')
  }));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(errors());

  app.use('/api', routes);
  app.use('/', staticMiddleware);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const error: any = new Error('Not Found');
    error['status'] = 404;
    next(error);
  });

  /// error handlers
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }

    /**
     * Handle validation error thrown by Celebrate + Joi
     */
    if (isCelebrate(err)) {
      return res
        .status(422)
        .send({ error: err.joi.details })
        .end();
    }
    return next(err);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

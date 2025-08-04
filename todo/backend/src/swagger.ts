import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do API',
      version: '1.0.0',
      description: 'Express + MongoDB 기반 To-Do 리스트 API 문서',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 4000}` },
    ],
    components: {
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            done: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        TodoInput: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string' },
            done: { type: 'boolean' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

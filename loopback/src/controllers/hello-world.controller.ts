// Uncomment these imports to begin using these cool features!

import {
  Request,
  ResponseObject,
  RestBindings,
  get,
  response,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import helloWorld from '../defer/helloWorld';

const HELLO_WORLD_RESPONSE: ResponseObject = {
  description: 'Hello World Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'HelloWorldResponse',
        properties: {
          executionID: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export class HelloWorldController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @get('/ping')
  @response(200, HELLO_WORLD_RESPONSE)
  async helloWorld(): Promise<object> {
    const {id: executionID} = await helloWorld();
    return {
      executionID,
      headers: Object.assign({}, this.req.headers),
    };
  }
}

'use strict';
import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';
import apiInfo from '../../../database/models/apiInfo';

module.exports = {
  description: 'Get git data',
  validate: {
    query: Joi.object({
      id: Joi.number().required(),
    }),
    failAction: (request, h, error) => error,
  },
  handler: (request, h) => {
    return new Promise((resolve, reject) => {
      const { id } = request.query;
      async.auto({
        apiData: async.asyncify(() => {
          return apiInfo.findOne({
            where: {
              id,
            }
          }).then(result => {
            if (result) {
              return result;
            }
            return Promise.reject(Boom.badRequest('No data available'));
          })
        })
      }, (err, results) => {
        if(err) {
          console.log(err)
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results,
          success: true,
        })
      })
    })
  }
}
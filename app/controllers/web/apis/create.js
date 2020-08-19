'use strict';
import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';
import apiInfo from '../../../database/models/apiInfo';
import axios from 'axios';

module.exports = {
  description: 'Add git data',
  validate: {
    payload: Joi.object({
      apiUrl: Joi.string().required(),
    }),
    failAction: (request, h, error) => error,
  },
  handler: (request, h) => {
    return new Promise((resolve, reject) => {
      const { apiUrl } = request.payload;
      async.auto({
        apiData: async.asyncify(() => {
          return axios.get(apiUrl).then(response => {
            const data = response.data;
            data.forEach(apiData => {
              const { id, name, html_url, description, open_issues, watchers, created_at, owner = {}} = apiData;
              const ownerId = owner['id'];
              const ownerHtmlUrl = owner['html_url'];
              const { avatar_url, site_admin, type } = owner;
              const data = {
                id,
                name,
                ownerId,
                htmlUrl: html_url,
                description,
                watchers,
                openIssues: open_issues,
                createdAt: created_at,
                ownerHtmlUrl,
                avatarUrl: avatar_url,
                ownerType: type,
                siteAdmin: site_admin,
              }
              return apiInfo.findOne({
                where: {
                  id,
                }
              }).then(result => {
                if (!result) {
                  return apiInfo.create(data).then(result => {
                    return result
                  }).catch(err => {
                    console.log(err);
                    return Promise.reject(Boom.badRequest('error while inserting data'));
                  })
                }
                return apiInfo.update(data,{ 
                  where: {
                    id,
                  }
                }).then(updatedResult => {
                  return updatedResult;
                }).catch(err => {
                  console.log(err);
                  return Promise.reject(Boom.badRequest('error while updating data'));
                })
              })
            })
          })
        }),
      }, (err, results) => {
        if(err) {
          console.log(err)
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.apiData,
          success: true,
        })
      })
    })
  }
}
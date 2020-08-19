'use strict';

exports.plugin = {  
  pkg: require('../../../package.json'),
  name : 'api_routes',
  register: async (server, options) => {
    const Controllers = {
      index: require('../../controllers/web/apis/index'),
      create: require('../../controllers/web/apis/create'),
    };
    server.route([{
      method: 'GET',
      path: '/',
      config: Controllers.index
    }, {
      method: 'POST',
      path: '/add',
      config: Controllers.create,
    }]);
  }
};
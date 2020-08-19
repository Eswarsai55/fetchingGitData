import authenticatedb from './authenticateDB';

exports.plugin = {  
  name : 'mysql',
  register: async (server, options) => {
    authenticatedb();
  }
};
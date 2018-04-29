var _pass = require('./ps.js').password;
var _port = require('./ps.js').port;
var _mongo_account = require('./ps.js').mongo_account;


module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '211.110.229.78',
      username: 'root',
      // pem: './path/to/pem'
      password: _pass,
      opts: {"port": _port}
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'weatherReport',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://weatherreort.kr',
      MONGO_URL: _mongo_account, 
	      // MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    volumes: {
      // host : docker
      'host_Uploads': '/host_Uploads'
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.9.4-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  /*
  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
  */

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};

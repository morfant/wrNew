module.exports = {
  servers: {
    one: {
      host: '211.110.229.78',
      username: 'root',
      // pem:
      password: 'akdyspwm77',
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'weatherReport',
    path: '../',
    volumes: {
	"/opt/uploads/weatherreport": "/host_Uploads",
	"/opt/uploads/weatherreport/tmp": "/host_Uploads/tmp",
	"/home/giy": "/home"
    },
    docker: {
	image: 'abernix/meteord:base',
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://weatherreport.kr',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 260
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};

// const withImages = require("next-images");
// const { withPlugins } = require("next-compose-plugins");

// const nextConfig = {
//   env: {
//     API_URL: "https://multikart-graphql-dun.vercel.app/server.js",
//     REACT_S3_BUCKETNAME: process.env.NEXT_PUBLIC_REACT_S3_BUCKETNAME,
//   },

//   // if you want to run with local graphQl un-comment below one and comment the above code
//   // env: {
//   //   API_URL: "http://localhost:4000/graphql",
//   // },

//   webpack(config, options) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: {
//         test: /\.(js|ts)x?$/,
//       },
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },
// };

// module.exports = {swcMinify: true}, withPlugins([withImages], nextConfig);

// noinspection JSUnusedGlobalSymbols
module.exports = {
  webpack: (config) => {
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      });
      return config;
    },
    webpackDevMiddleware: (config) => {
      return config;
    },
  future: {
      webpack5: true,
  },
  env: {
    
      REACT_S3_BUCKETNAME: process.env.NEXT_PUBLIC_REACT_S3_BUCKETNAME,
 
   
  },
 
};



module.exports = {
    webpackDevMiddleware: config =>{
        config.watchOptions.poll = 300; // Check for changes every 300 milliseconds
        return config;
    } 
};  

// import { webpack } from "next/dist/compiled/webpack/webpack";

// module.exports={
//     webpack:(config)=>{
//         return{
//             ...config,
//             watchOptions:{
//                 ...config.watchOptions,
//                 poll:300
//             }
//         };
//     },
//     allowedDevOrigin:['ticketing.dev']
//     // webpackDevMiddleware: (config) => {
//     //     config.watchOptions = {
//     //         poll: 1000, // Check for changes every second
//     //         //aggregateTimeout: 300, // Delay before rebuilding after the first change
//     //     };
//     //     return config;
//     // },
// }
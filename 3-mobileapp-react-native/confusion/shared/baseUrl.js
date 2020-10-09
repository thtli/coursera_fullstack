import Constants from "expo-constants";
const { manifest } = Constants;

export const baseUrl = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? "http://" + manifest.debuggerHost.split(`:`).shift().concat(`:8000/`)
  : `api.example.com`;
  
// console.log("Base URL : ",baseUrl);


/**
 * use with json-server
 * json-server --host 0.0.0.0 --port 8000 ./db.json --watch
 */
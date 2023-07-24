/**
 * Global Imports
*/

import axios, { AxiosRequestConfig, Method } from 'axios';


/**
 * Local Imports
*/

import { ApiConfig } from "../config/Api";
import { TokenModel } from '../models/TokenModal';
import Config from 'react-native-config';



export type Authorization = TokenModel;
export interface Request {
    method: string;
    uri: string;
    data?: object;
    headers?: object;
  }

/**
 * Wrapper around axios. Will call API with given request parameters.
 *
 * @param {Request} request
 * @param {Authorization} auth
 *
 * @return {Promise}
 */
function call<Response = any>(request: Request): Promise<Response> {
    const headers: object = {
        Authorization: `Bearer ${Config.API_ACCESS_TOKEN}`,
        ...request.headers,
      };    
    
      const config: AxiosRequestConfig = {
        headers,
        method: request.method as Method,
        url: ApiConfig.url + request.uri,
        // [request.method.toLowerCase() === 'get' ? 'params' : 'data']: request.data || {},
      };
    

      console.log('here is apo call', config)
      return new Promise((resolve, reject): void => {
        axios(config)
          .then(response => resolve(response.data))
          .catch(reject);
      });
}
  /**
   * Namespaced Exports
  */
  
  export const Api = { call };
  
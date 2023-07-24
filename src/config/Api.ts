/**
 * Global Imports
*/

import Config from 'react-native-config';

/**
 * Types/Interfaces
*/

export type ApiConfigType = {
  url: string | undefined;
};

/**
 * Config
*/

export const ApiConfig: ApiConfigType = {
  url: Config.API_URL
};

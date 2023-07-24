/**
 * Global Imports
*/

import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { TMBD } from '../services/Configuration';

/**
 * Local Imports
*/

/**
 * Types/Interfaces
*/

export interface ApiProviderProps {
  children: ReactNode;
}

export interface ApiContextInterface {
  apiConfig: ConfigurationModel | undefined;
}

/**
 * Contexts
*/

export const ApiContext = createContext<ApiContextInterface | undefined>(undefined);

/**
 * Components
*/

/**
 * @return {JSX.Element}
 */
export function ApiProvider(props: ApiProviderProps): JSX.Element {
  /** States **/

  const [ apiConfig, setApiConfig ] = useState<ConfigurationModel>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your asynchronous code here, e.g., API calls or async operations
        const response = await TMBD.configuration()
        setApiConfig(response); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData()
      
    }, [])
  


  /** Output **/

  return (
    <ApiContext.Provider value={{ apiConfig }}>
      { props.children }
    </ApiContext.Provider>
  );
}

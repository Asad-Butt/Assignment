/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { ApiProvider } from './src/provider/ApiProvider';
import { FavoriteMoviesProvider } from './src/context/FavoriteMoviesContext';

function App(): JSX.Element {

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Your asynchronous code here, e.g., API calls or async operations
  //       const response = await TMBD.configuration()
  //       // const data = await response.json();
  //       console.log('resp', response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData()
  //   }, [])

  return (
    <ApiProvider>
      <FavoriteMoviesProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </FavoriteMoviesProvider>
    </ApiProvider>
  );
}

export default App;

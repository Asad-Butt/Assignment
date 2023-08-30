
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const FavoriteMoviesContext = createContext();

export const useFavoriteMovies = () => {
  return useContext(FavoriteMoviesContext);
};

export const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Load favorite movies from AsyncStorage when the context initializes
  useEffect(() => {
    AsyncStorage.getItem('favoriteMovies')
      .then(savedFavoriteMovies => {
        if (savedFavoriteMovies) {
          setFavoriteMovies(JSON.parse(savedFavoriteMovies));
        }
      })
      .catch(error => {
        console.error('Error loading favorite movies from storage:', error);
      });
  }, []);

  // Update AsyncStorage whenever favoriteMovies state changes
  useEffect(() => {
    AsyncStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies))
      .catch(error => {
        console.error('Error saving favorite movies to storage:', error);
      });
  }, [favoriteMovies]);

  return (
    <FavoriteMoviesContext.Provider value={{ favoriteMovies, setFavoriteMovies }}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

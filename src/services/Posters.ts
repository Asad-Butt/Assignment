import Config from 'react-native-config';
import {Api} from '../util/Api';

/**
 * Get configuration.
 *
 *
 * @return {Promise<PosterModel>}
 */
function posters(page: number): Promise<PosterModel> {
  const config = {
    method: 'GET',
    uri: `/3/movie/popular?api_key=${Config.API_KEY}&page=${page}`,
  };
  return Api.call<PosterModel>(config);
}

function trendingMovies(page: number): Promise<PosterModel> {
  const config = {
    method: 'GET',
    uri: `/3/trending/movie/week?api_key=${Config.API_KAY}&page=${page}`,
  };
  return Api.call<PosterModel>(config);
}

export const Posters = {
  get: posters,
  getTrendingMovies: trendingMovies,
};

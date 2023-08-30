import {useEffect, useState} from 'react';
import {Posters} from '../services/Posters';

// Custom hook for a simple counter
function useMovies(initialPageNumber: number, type: string) {
  const [pageNumber, setPageNumber] = useState<number>(initialPageNumber);
  const [movies, setMovies] = useState<PosterModel>();

  const fetchMovie = async () => {
    let response: any;
    if (type == 'trending') {
      console.log('Getting trending movies...');
      response = await Posters.getTrendingMovies(pageNumber);
    } else {
      console.log('Getting popular movies...');
      response = await Posters.get(pageNumber);
    }
    setMovies(prevMovies => {
      let newResults = response?.results || []; // Start with the new response results or an empty array if undefined/null

      if (prevMovies?.results) {
        // Merge the previous results with the new results
        newResults = [...prevMovies.results, ...newResults];
      }

      let newMovies: PosterModel = {
        page: response?.page,
        results: newResults,
        total_pages: response?.total_pages,
        total_results: response?.total_results,
      };

      return newMovies;
    });
  };

  useEffect(() => {
    fetchMovie();
  }, [pageNumber]);

  const nextPage = () => {
    if (movies?.total_pages > pageNumber) {
      setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
    }
  };

  return {movies, nextPage};
}

export default useMovies;

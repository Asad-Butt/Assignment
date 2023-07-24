// /**
//  * @format
//  */

import Config from "react-native-config";

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Mock the configuration API response
const mock = new MockAdapter(axios);

// Mock the implementation of fetchPopularMovies directly
const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${Config.API_KEY}&page=1`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Test the successful popular movies API response
test('fetch popular movies - success', async () => {
    const mockResponse = {
        page: 1,
        results: [
            {
                "adult": false,
                "backdrop_path": "/f7UI3dYpr7ZUHGo0iIr1Qvy1VPe.jpg",
                "genre_ids": [
                    16,
                    10751,
                    14,
                    35
                ],
                "id": 1040148,
                "original_language": "en",
                "original_title": "Ruby Gillman, Teenage Kraken",
                "overview": "Ruby Gillman, a sweet and awkward high school student, discovers she's a direct descendant of the warrior kraken queens. The kraken are sworn to protect the oceans of the world against the vain, power-hungry mermaids. Destined to inherit the throne from her commanding grandmother, Ruby must use her newfound powers to protect those she loves most.",
                "popularity": 1011.919,
                "poster_path": "/kgrLpJcLBbyhWIkK7fx1fM4iSvf.jpg",
                "release_date": "2023-06-28",
                "title": "Ruby Gillman, Teenage Kraken",
                "video": false,
                "vote_average": 7.6,
                "vote_count": 160
            },
            {
                "adult": false,
                "backdrop_path": "/PwI3EfasE9fVuXsmMu9ffJh0Re.jpg",
                "genre_ids": [
                    27,
                    9648,
                    53
                ],
                "id": 406563,
                "original_language": "en",
                "original_title": "Insidious: The Last Key",
                "overview": "Parapsychologist Elise Rainier and her team travel to Five Keys, NM, to investigate a man’s claim of a haunting. Terror soon strikes when Rainier realizes that the house he lives in was her family’s old home.",
                "popularity": 975.191,
                "poster_path": "/nb9fc9INMg8kQ8L7sE7XTNsZnUX.jpg",
                "release_date": "2018-01-03",
                "title": "Insidious: The Last Key",
                "video": false,
                "vote_average": 6.3,
                "vote_count": 2550
            },
        ],
        total_pages: 10,
        total_results: 100,
    };

    mock.onGet(`https://api.themoviedb.org/3/movie/popular?api_key=${Config.API_KEY}&page=1`).reply(200, mockResponse);;

    const response = await fetchPopularMovies();
    expect(response.page).toBe(1);
    expect(response.results).toHaveLength(2);
});

// Test the exceptional case where the API returns an error
test('fetch popular movies - error', async () => {
    mock.onGet(`https://api.themoviedb.org/3/movie/popular?api_key=${Config.API_KEY}&page=1`).reply(500, {
        error: 'Server error',
    });

    try {
        await fetchPopularMovies();
    } catch (error) {
        expect(error.response.status).toBe(500);
        expect(error.response.data.error).toBe('Server error');
    }
});
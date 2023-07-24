// /**
//  * @format
//  */

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Mock the configuration API response
const mock = new MockAdapter(axios);

// Mock the implementation of fetchConfiguration directly
const fetchConfiguration = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/configuration');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Test the successful configuration API response
test('configuration - success', async () => {
  mock.onGet('https://api.themoviedb.org/3/configuration').reply(200, {
    data: true,
  });

  const response = await fetchConfiguration();
  expect(response.data).toBe(true);
});

// Test the exceptional case where the API returns an error
test('configuration - error', async () => {
  mock.onGet('https://api.themoviedb.org/3/configuration').reply(500, {
    error: 'Server error',
  });

  try {
    await fetchConfiguration();
  } catch (error) {
    expect(error.response.status).toBe(500);
    expect(error.response.data.error).toBe('Server error');
  }
});
import { browser } from '$app/environment';

const CACHE_KEY = 'revilo-github-repos';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function fetchRepos() {
  let cached = null;

  if (browser) {
    cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');

    // Return fresh cache if it's valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }

  try {
    const response = await fetch(`https://api.github.com/users/Revilo0509/repos`);
    if (!response.ok) throw new Error('Failed to fetch repos');

    const data = await response.json();

    if (browser) {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    }

    return data;
  } catch (err) {
    // If fetch fails, return cached data even if stale
    if (cached) return cached.data;
    throw err;
  }
}

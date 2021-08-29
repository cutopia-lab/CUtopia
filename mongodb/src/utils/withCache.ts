import NodeCache from 'node-cache';

const withCache = async (
  cache: NodeCache,
  cacheKey: string,
  callback: () => any
) => {
  if (!cacheKey) {
    return;
  }
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Cached: ${JSON.stringify(cachedData)}`);
    return cachedData;
  }
  const fetchedData = await callback();
  console.log(`Fetched: ${JSON.stringify(fetchedData)}`);
  if (fetchedData) {
    cache.set(cacheKey, fetchedData);
  }
  return fetchedData;
};

export default withCache;

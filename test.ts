import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://immortal-amoeba-48047.upstash.io',
  token: 'AbuvASQgMzcxMDRhNjItNWUzOS00NmMwLWE2ODAtNDYzYjI3MjE0NDE2MzgxMzBiMDgxNTliNGNhY2EwOTU3NjdhYzI1ODkxZTQ=',
});

async function setName() {
  try {
    await redis.set('foo', 'bar');
    console.log('Value set successfully.');
  } catch (error) {
    console.error('Error setting value:', error);
  }
}

async function getName() {
  try {
    const data = await redis.get('foo');
    console.log('Value:', data);
  } catch (error) {
    console.error('Error getting value:', error);
  }
}

(async () => {
  await setName(); // Set the value 'bar' for key 'foo'
  await getName(); // Get the value for key 'foo'
  
  // Close the connection when done
  // await redis.disconnect();
})();

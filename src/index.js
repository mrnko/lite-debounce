// index.js
// Example usage of the LiteDebounce library. This file demonstrates how to create a debounced function and attach it to a window event.
import { LiteDebounce } from './LiteDebounce.js'; // Import the LiteDebounce class

// Create an instance of LiteDebounce with a callback function, delay, and options
const instance = new LiteDebounce(() => {
  console.log('Called!'); // This will be logged when the debounced function is triggered
}, 300, { leading: true }); // 300ms delay, call on the leading edge

// Get the debounced version of the function
const debouncedFn = instance.fnDebounced;

// Attach the debounced function to the window resize event
window.addEventListener('resize', debouncedFn);
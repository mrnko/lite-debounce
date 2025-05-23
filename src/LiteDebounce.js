// LiteDebounce.js
// This library provides a lightweight debounce utility class for JavaScript functions. It allows you to control how often a function is executed by delaying its invocation until a specified period has elapsed since the last call. Supports both leading and trailing edge execution modes.

// The LiteDebounce class implements a debounce mechanism for functions, allowing you to control their call frequency
class LiteDebounce {
  /**
   * LiteDebounce class constructor
   * @param {Function} fn - The function to debounce
   * @param {number} [delay=300] - Delay in milliseconds between calls
   * @param {Object} [options={}] - Additional options
   * @param {boolean} [options.leading=false] - If true, the function will be called on the leading edge (immediately on the first call)
   */
  constructor(fn, delay = 300, options = {}) {
    this.fn = fn; // Store the provided function
    this.delay = delay; // Set the delay between calls
    this.leading = options.leading || false; // Determine call mode: leading (immediate) or trailing (after delay)

    this.timeoutId = null; // ID of the active setTimeout timer, used to reset previous calls
    this.leadingCalled = false; // Flag indicating whether the function has already been called in leading mode
  }

  /**
   * Internal debounced function that receives the call context explicitly
   * @param {any} callContext - The context to use for the original function
   * @param {...any} args - Arguments passed to the original function
   */
  _debouncedFunctionWithContext(callContext, ...args) {
    if (this.leading && !this.leadingCalled) {
      this.fn.apply(callContext, args);
      this.leadingCalled = true;
    }
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      if (!this.leading) {
        this.fn.apply(callContext, args);
      }
      this.leadingCalled = false;
    }, this.delay);
  }

  /**
   * Getter for the debounced function
   * Allows using the class instance as a source of a ready-to-use debounced function
   * @returns {Function} - The debounced function
   */
  get fnDebounced() {
    const instance = this;
    // Return a wrapper that preserves the correct instance and allows binding of context
    return function(...args) {
      return instance._debouncedFunctionWithContext(this, ...args);
    };
  }
}

// Export the LiteDebounce class for use in other modules
export { LiteDebounce };
import { describe, it, expect } from 'vitest';
import { LiteDebounce } from '../src/LiteDebounce.js';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('LiteDebounce', () => {
  it('should call function only once after delay (trailing)', async () => {
    let count = 0;
    const debouncer = new LiteDebounce(() => { count++; }, 100);
    const fn = debouncer.fnDebounced;
    fn(); fn(); fn();
    await wait(150);
    expect(count).toBe(1);
  });

  it('should call function immediately if leading is true', async () => {
    let count = 0;
    const debouncer = new LiteDebounce(() => { count++; }, 100, { leading: true });
    const fn = debouncer.fnDebounced;
    fn(); fn();
    await wait(150);
    expect(count).toBe(1);
    fn();
    await wait(150);
    expect(count).toBe(2);
  });

  it('should pass arguments to the original function', async () => {
    let result = null;
    const debouncer = new LiteDebounce((a, b) => { result = a + b; }, 50);
    const fn = debouncer.fnDebounced;
    fn(2, 3);
    await wait(70);
    expect(result).toBe(5);
  });

  it('should preserve context (this) in the debounced function', async () => {
    let contextValue = null;
    const obj = {
      value: 42,
      test: function() {
        contextValue = this.value;
      }
    };
    const debouncer = new LiteDebounce(obj.test, 50);
    const fn = debouncer.fnDebounced.bind(obj);
    fn();
    await wait(70);
    expect(contextValue).toBe(42);
  });
}); 
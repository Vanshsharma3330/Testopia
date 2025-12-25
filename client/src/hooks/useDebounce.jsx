import { useCallback, useRef } from "react";

export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  // Function to cancel debounce if needed
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return [debouncedCallback, cancel];
}

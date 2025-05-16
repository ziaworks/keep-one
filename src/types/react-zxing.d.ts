declare module 'react-zxing' {
  import { RefObject } from 'react';

  interface ZxingResult {
    getText(): string;
    // Add other methods/properties as needed
  }

  interface UseZxingOptions {
    onDecodeResult?: (result: ZxingResult) => void;
    onError?: (error: Error) => void;
    constraints?: MediaStreamConstraints;
    signal?: AbortSignal;
  }

  interface UseZxingReturn {
    ref: RefObject<HTMLVideoElement>;
  }

  export function useZxing(options?: UseZxingOptions): UseZxingReturn;
} 
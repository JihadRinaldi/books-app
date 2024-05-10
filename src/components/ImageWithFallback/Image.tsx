import { useEffect, useState } from 'react';

export interface ImageWithFallbackProps  {
  src: string;
  width: number;
  height: number;
  alt: string;
  fallbackSrc?: string;
}

const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc = '/icons/image-fallback.svg',
  ...rest
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={setError}
      {...rest}
    />
  );
};

export default ImageWithFallback;

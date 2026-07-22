import { useEffect, useRef } from 'react';

const CACHE_KEY = 'cms-revision';

export function useCmsRevision() {
  const revisionRef = useRef(Number(localStorage.getItem(CACHE_KEY) || '0'));

  const bump = useRef(() => {
    const next = Date.now();
    localStorage.setItem(CACHE_KEY, String(next));
    window.dispatchEvent(new Event('cms-revision-changed'));
  }).current;

  useEffect(() => {
    const handler = () => {
      revisionRef.current = Number(localStorage.getItem(CACHE_KEY) || '0');
    };
    window.addEventListener('cms-revision-changed', handler);
    return () => window.removeEventListener('cms-revision-changed', handler);
  }, []);

  return { revision: revisionRef.current, bump };
}

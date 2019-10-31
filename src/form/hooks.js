import React from 'react';

export function useMount(effect) {
  const effectRef = React.useRef(effect);
  React.useEffect(() => {
    if (typeof effectRef.current === 'function') {
      effectRef.current();
    }
  }, []);
}

export function useUpdate(effect, deps) {
  const effectRef = React.useRef(effect);
  const isInitialRef = React.useRef(true);
  React.useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false;
      return;
    }
    effectRef.current();
  }, [deps]);
}

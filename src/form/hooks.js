import React from 'react';

export function useMount(effect) {
  const effectRef = React.useRef(effect);
  React.useEffect(() => {
    if (typeof effectRef.current === 'function') {
      effectRef.current();
    }
  }, []);
}

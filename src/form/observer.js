import React from 'react';
import { BehaviorSubject } from 'rxjs';
import nanoid from 'nanoid';
import Register from './register';

const register = new Register();

export function useBehaviorSubject(id = nanoid()) {
  const stream$ = React.useMemo(() => {
    return register.register(id, () => new BehaviorSubject());
  }, [id]);
  React.useEffect(() => {
    return () => {
      stream$.complete();
      register.cancel(id);
    };
  }, [stream$, id]);
  return stream$;
}

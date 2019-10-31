import React from 'react';
import { isObservable, BehaviorSubject } from 'rxjs';
import Store from './store';
import { useMount, useUpdate } from './hooks';
// import { unsubscribe } from './utils';

const FormContext = React.createContext({});

export default function Form(props) {
  const { data } = props;
  const { store } = React.useMemo(
    () => ({ store: new Store(data) }),
    // eslint-disable-next-line
    []
  );
  useUpdate(() => {
    store.setData(data);
    // eslint-disable-next-line
  }, [data]);
  return <FormContext.Provider value={{ store }}>{props.children}</FormContext.Provider>;
}

export function useStore() {
  const { store } = React.useContext(FormContext);
  return store;
}

export function useField(name, opts = {}) {
  const { store } = React.useContext(FormContext);
  const [options, updateOptions] = React.useState(opts);

  const { defaultValue } = options;
  const [value, setValue] = React.useState(defaultValue);
  const inputs$ = React.useMemo(
    () => new BehaviorSubject(defaultValue),
    // eslint-disable-next-line
    []
  );

  const update = inputFactory => {
    inputs$.next(value);
    const output = inputFactory(inputs$);
    if (isObservable(output)) {
      output.subscribe(value => {
        setValue(value);
        store.set(name, value);
      });
    } else {
      setValue(output);
      store.set(name, output);
    }
  };

  useMount(() => {
    store.broadcast$.subscribe(infos => {
      console.log('接收到的数据', infos);
      // const { type } = infos;
      // switch (type) {
      //   case 'data': {
      //     const value = store.get(name);
      //     setValue(value);
      //     break;
      //   }
      //   default:
      //     break;
      // }
    });
  });

  return { value, update, updateOptions };
}

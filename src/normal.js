import React from 'react';
import Form, { useField, useStore } from './form/form';

import './styles.css';

function A() {
  const { value, update } = useField('calculate');
  const onChange = React.useCallback(e => update(() => e.target.value), [update]);
  return (
    <div>
      <input onChange={onChange} />
      <div>{value}</div>
    </div>
  );
}

function Submit() {
  const store = useStore();
  const submit = React.useCallback(() => {
    console.log(store.getData());
  }, [store]);
  return <button onClick={submit}>提交</button>;
}

export default function Normal() {
  const [data, setData] = React.useState({});
  const addData = () => {
    setData({ calculate: Math.random() });
  };
  return (
    <>
      <div style={{ padding: 20, border: '1px solid red' }}>
        <Form data={data}>
          <button onClick={addData}>添加数据</button>
          <A />
          <Submit />
        </Form>
      </div>
    </>
  );
}

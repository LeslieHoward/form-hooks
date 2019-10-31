import React from 'react';
import SchemaForm, { createFormActions, createVirtualBox, registerFormField, connect, Field } from '@uform/react';
import _ from 'lodash';

const actions = createFormActions();
const catchWith = task => (task.then ? task.then(data => [data, null]).catch(error => [null, error]) : task);

function Block(props) {
  return (
    <div className='block'>
      <div>标题</div>
      <div>{props.children}</div>
    </div>
  );
}

function Name(props) {
  const { dispatchVisible } = props;

  return (
    <div style={{ marginBottom: 30 }}>
      <button
        onClick={e => {
          e.preventDefault();
          dispatchVisible();
        }}
      >
        切换显示状态
      </button>
    </div>
  );
}

function Money(props) {
  const { value = '', visible, dispatchVisible, errors = [], ...restProps } = props;
  console.log('props', props);
  if (visible === false) {
    return null;
  }
  return (
    <div style={{ marginBottom: 30 }}>
      <div name='name' className='form-item'>
        <label htmlFor='name' className='formItem-label'>
          请输入金额：
        </label>
        <div className='form-item-editor'>
          <input {...restProps} value={value} />
        </div>
      </div>
    </div>
  );
}

registerFormField('name', connect()(props => <Name {...props} />));
registerFormField('money', connect()(props => <Money {...props} />));

const VirtualBox = createVirtualBox('block', props => <Block {...props} />);

export default function Uform() {
  const submit = async () => {
    const [, errors] = await catchWith(actions.submit());
    console.log('actions', actions);
    if (errors !== null) {
      _.forEach(errors, error => {
        actions.setFieldState(error.name, state => {
          console.log('当前state', state);
          _.set(state, ['props', 'x-props', 'errors'], error.errors);
        });
      });
    }
  };
  return (
    <>
      <SchemaForm
        actions={actions}
        effects={($, { setFieldState }) => {
          $('onFieldChange', filter => {
            return /[a-z]+/.test(filter.name);
          }).subscribe(fieldState => {
            setFieldState('b', state => {
              state.value = fieldState.value;
            });
          });
          $('visible', 'a').subscribe(() => {
            setFieldState('b', state => {
              console.log(state);
              state.visible = !state.visible;
            });
          });
        }}
        defaultValue={{ a: '20', b: '200' }}
        onSubmit={values => {
          console.log('表单的值', values);
        }}
      >
        <VirtualBox>
          <Field
            name='a'
            type='name'
            x-effect={dispatch => ({
              dispatchVisible() {
                dispatch('visible');
              }
            })}
          />
          <Field
            name='b'
            type='money'
            x-props={{ visible: true, errors: [] }}
            x-rules={v => {
              return /^\d+$/.test(v) === false ? '请输入数字' : '';
            }}
          />
        </VirtualBox>
      </SchemaForm>
      <button onClick={submit}>提交</button>
    </>
  );
}

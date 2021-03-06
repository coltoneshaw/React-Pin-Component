import React, {
  useState, useEffect,
} from 'react';
import type { PinInputProps } from 'react-pin-component';
import PinItem from './PinItems';

import {
  fillValues, moveFocus, onBackspace, addSplitElement,
} from './utils';

const PinInput = ({
  length = 6,
  style = {},
  initialValue = undefined,
  focus = true,
  validate,
  regexCriteria = /^[a-zA-Z0-9]+$/,
  InputComponent = undefined,
  onChange,
  inputOptions,
  addSplit = undefined,

}: PinInputProps) => {
  const [values, updateValues] = useState(() => fillValues(length, initialValue ?? ''));

  const onPaste = (pasteString: string) => {
    updateValues((prevState) => prevState.map((value, i) => ({
      value: pasteString[i] ?? '',
      name: value.name,
    })));
  };

  useEffect(() => {
    const pin = values.map((v) => v.value).join('');
    onChange(pin, pin.length === length);
  }, [values, length, onChange]);

  const onItemChange = (value: string, index: number) => {
    updateValues((prevState) => prevState.map((v, i) => {
      if (i === index) return { value, name: v.name };
      return v;
    }));
    if (value && index < length - 1) moveFocus(index, false);
  };

  useEffect(() => {
    // if focus is enabled this will move the focus to the very first input box.
    if (focus && length) moveFocus(-1, false);
  }, [focus, length]);

  const valueArray = values.map((e, i) => (
    <PinItem
      inputOptions={{
        debug: inputOptions.debug ?? false,
        removeDefaultInputStyles: inputOptions.removeDefaultInputStyles ?? false,
        inputFocusStyle: inputOptions.inputFocusStyle ?? {},
      }}
      pinValue={e}
      length={length}
      index={i}
      key={e.name}
      onBackspace={onBackspace}
      onItemChange={(value) => onItemChange(value, i)}
      validate={validate}
      onPaste={onPaste}
      regexCriteria={regexCriteria}
      InputComponent={InputComponent}
    />
  ));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      className="react-pin-component"
    >
      {addSplitElement(addSplit, valueArray)}
    </div>
  );
};

export default PinInput;

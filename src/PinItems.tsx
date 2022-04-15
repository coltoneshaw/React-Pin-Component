import React, {
  DetailedHTMLProps, InputHTMLAttributes, useState, useEffect, CSSProperties,
} from 'react';

import type { PinItemProps } from 'react-pin-component';
import { checkAndUpdate } from './utils';

import RenderContent from './CustomComponent';

const defaultStyles = {
  padding: 0,
  margin: '0 2px',
  textAlign: 'center',
  border: '1px solid black',
  background: 'transparent',
  width: '50px',
  height: '50px',
} as CSSProperties;

const PinItem = ({
  validate,
  pinValue,
  onBackspace,
  onItemChange,
  onPaste,
  inputOptions,
  index,
  regexCriteria,
  InputComponent,
}: PinItemProps) => {
  const { debug, inputFocusStyle, removeDefaultInputStyles } = inputOptions;
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [changeFunction] = useState(() => onItemChange);

  useEffect(() => {
    if (pinValue.value === value) return;
    checkAndUpdate(pinValue.value, setValue, setUpdated, debug, validate, regexCriteria);
  }, [pinValue.value, regexCriteria, validate, value, debug]);

  const onKeyDown = (e:DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      onBackspace(index);
      setValue('');
      changeFunction('');
      return;
    }
    if (debug) console.log({ index, value: e.key });
    checkAndUpdate(String(e.key), setValue, setUpdated, debug, validate, regexCriteria);
  };

  useEffect(() => {
    if (updated) changeFunction(value);
    setUpdated(false);
  }, [value, updated, changeFunction]);

  return (
    <RenderContent
      InputComponent={InputComponent}
      onKeyDown={onKeyDown}
      maxLength={1}
      onBlur={() => setFocus(false)}
      onPaste={(e: any) => {
        if (!onPaste) return;
        const pasteValue = e.clipboardData.getData('text');
        onPaste(pasteValue);
      }}
      onFocusCapture={() => setFocus(true)}
      name={`pin-${index}`}
      style={{
        ...(removeDefaultInputStyles ? {} : defaultStyles),
        // render focus styles if in focus
        ...(focus ? inputFocusStyle : {}),
      }}
      value={value}
    />
  );
};
export default PinItem;

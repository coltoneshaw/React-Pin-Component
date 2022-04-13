import {
  DetailedHTMLProps, InputHTMLAttributes, useState, useEffect,
} from 'react';

import type { PinItemProps } from "react-pin-component" 

const checkValue = (
  value: string,
  debug?: boolean,
  validate?: (value: string) => boolean,
  regexCriteria?: RegExp,
) => {
  if (String(value).length > 1) {
    if (debug) console.debug('invalid length of value');
    return 'invalid';
  }
  if (validate) {
    if (validate(value)) return value;
    if (debug) console.debug('invalid on validate');
    return 'invalid';
  }
  if (regexCriteria) {
    if (debug) console.debug('invalid on regex');
    if (regexCriteria.test(value)) return value;
    return 'invalid';
  }
  return value;
};

const checkAndUpdate = (
  value: unknown,
  setValue: Function,
  setUpdated: Function,
  debug?: boolean,
  validate?: (value: string) => boolean,
  regexCriteria?: RegExp,
) => {
  const check = checkValue(String(value), debug, validate, regexCriteria);
  if (check === 'invalid') {
    return;
  }
  setValue(value);
  setUpdated(true);
};
const styles = {
  inputFocus: {
    outline: 'none',
    boxShadow: 'none',
  },
};

const PinItem = ({
  validate,
  pinValue,
  onBackspace,
  onItemChange,
  disabled,
  placeholder,
  ariaLabel,
  secret,
  type,
  inputMode,
  onPaste,
  inputStyle,
  inputFocusStyle,
  index,
  regexCriteria,
  debug,
}: PinItemProps) => {
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
    <input
      disabled={disabled}
      className="pincode-input-text"
      onKeyDown={onKeyDown}
      placeholder={String(placeholder) ?? value}
      aria-label={ariaLabel ?? value}
      maxLength={1}
      autoComplete="off"
      type={secret ? 'password' : type}
      inputMode={inputMode}
      pattern={type === 'numeric' ? '[0-9]*' : '^[a-zA-Z0-9]+$'}
      onBlur={() => setFocus(false)}
      onPaste={(e) => {
        if (!onPaste) return;
        const pasteValue = e.clipboardData.getData('text');
        onPaste(pasteValue);
      }}
      name={`pin-${index}`}
      style={{
        padding: 0,
        margin: '0 2px',
        textAlign: 'center',
        border: '1px solid',
        background: 'transparent',
        width: '50px',
        height: '50px',
        ...inputStyle,
        ...(focus ? ({ ...styles.inputFocus, ...inputFocusStyle }) : {}),
      }}
      value={value}
    />
  );
};
export default PinItem;

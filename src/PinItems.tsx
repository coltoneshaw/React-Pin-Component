import React, {
  DetailedHTMLProps, InputHTMLAttributes, useState, useEffect, CSSProperties,
} from 'react';

import type { PinItemProps } from 'react-pin-component';
import { checkAndUpdate } from './utils';

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
  disabled,
  placeholder,
  ariaLabel,
  secret,
  type,
  // inputMode,
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
  const [styles, setStyles] = useState<CSSProperties>(() => defaultStyles);

  useEffect(() => {
    const newStyles = { ...defaultStyles };
    if (inputStyle) Object.assign(newStyles, inputStyle);
    if (focus) Object.assign(newStyles, inputFocusStyle);
    setStyles(newStyles);
  }, [inputStyle, inputFocusStyle, focus]);

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
      // inputMode={inputMode}
      pattern={type === 'numeric' ? '[0-9]*' : '^[a-zA-Z0-9]+$'}
      onBlur={() => setFocus(false)}
      onPaste={(e) => {
        if (!onPaste) return;
        const pasteValue = e.clipboardData.getData('text');
        onPaste(pasteValue);
      }}
      onFocusCapture={() => setFocus(true)}
      name={`pin-${index}`}
      style={styles}
      value={value}
    />
  );
};
export default PinItem;

import React, {
  useState, useEffect,
} from 'react';
import PinItem from './PinItems';
import type { PinInputProps } from "react-pin-component" 

const fillValues = (length: number, initialValue: number | string) => Array(length)
  .fill('')
  .map((x, i) => ({
    value: initialValue.toString()[i] || '',
    name: `pin${i}`,
  }));

const moveFocus = (index: number, direction: 'forward' | 'back') => {
  let key = index + 1;
  if (direction === 'back') key = index - 1;
  // if (key === ) key = length - 1;
  const nextSibling = document.querySelector(`input[name=pin-${key}]`) as HTMLElement;
  if (nextSibling !== null) nextSibling?.focus();
};

const PinInput = ({
  length = 6,
  style = {},
  initialValue = undefined,
  focus = true,
  disabled = false,
  secret = false,
  inputMode = undefined,
  validate,
  inputStyle = {},
  inputFocusStyle = {},
  regexCriteria = /^[a-zA-Z0-9]+$/,
  ariaLabel = '',
  placeholder = '',
  onChange,
  type = 'numeric',
  debug = false,
}: PinInputProps) => {
  const [values, updateValues] = useState(() => fillValues(length, initialValue ?? ''));

  const onBackspace = (index:number) => moveFocus(index, 'back');

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
    if (value && index < length - 1) moveFocus(index, 'forward');
  };

  useEffect(() => {
    if (focus && length) moveFocus(-1, 'forward');
  }, [focus, length]);

  return (
    <div
      style={style}
      className="pincode-input-container"
    >
      {values.map((e, i) => (
        <PinItem
          pinValue={e}
          length={length}
          index={i}
          key={e.name}
          disabled={disabled}
          onBackspace={onBackspace}
          secret={secret || false}
          onItemChange={(value) => onItemChange(value, i)}
          type={type}
          inputMode={inputMode}
          validate={validate}
          inputStyle={inputStyle}
          inputFocusStyle={inputFocusStyle}
          onPaste={onPaste}
          regexCriteria={regexCriteria}
          ariaLabel={ariaLabel}
          placeholder={placeholder}
          debug={debug}
        />
      ))}
    </div>
  );
};
export default PinInput;

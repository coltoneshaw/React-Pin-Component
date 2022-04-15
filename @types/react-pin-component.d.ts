declare module 'react-pin-component' {
  import {
    CSSProperties,
  } from 'react';

  export interface SharedProps {
    length: number
    // Validate should be a function taking the single digit pin value and returning true/false if it validates.
    validate?: (value: string) => boolean;
    regexCriteria?: RegExp;
    InputComponent?: React.ReactElement;
    inputOptions: {
      // only enable this in development. It will turn on console logging.
      debug?: boolean;
      removeDefaultInputStyles?: boolean;
      inputFocusStyle?: CSSProperties;

    }

  }

  export interface PinInputProps extends SharedProps {
    // Length of the pin you want
    initialValue?: number | string;
    style?: CSSProperties;
    focus?: boolean;
    onChange: (pin: string, completed: boolean) => any;
    addSplit?: { component: JSX.Element, every: number }
  }

  export interface PinItemProps extends SharedProps {

    onBackspace: (index: number) => void;
    onPaste: ((value: string) => void) | null;
    index: number;
    pinValue: { name: string, value: string }
    onItemChange: (value: string) => void
  }

  export interface PinInputComponent extends React.ComponentProps<'input'> {
    InputComponent?: React.ReactElement
  }

  // eslint-disable-next-line react/prefer-stateless-function
  class PinInput extends React.Component<PinInputProps> { }

  export default PinInput;

}

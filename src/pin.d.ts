declare module "react-pin-component" {
  import {
    CSSProperties, AriaRole,
  } from 'react';
  
  export interface SharedProps {
    length: number
    disabled?: boolean;
    secret?: boolean;
    type?: 'numeric' | 'custom';
    inputMode?: 'none' | 'search' | 'numeric' | 'text' | 'tel' | 'url' | 'email' | 'decimal' | undefined;
  
    // Validate should be a function taking the single digit pin value and returning true/false if it validates.
    validate?: (value: string) => boolean;
    inputStyle?: CSSProperties;
    inputFocusStyle?: CSSProperties;
    regexCriteria?: RegExp;
    ariaLabel?: AriaRole;
    placeholder?: string;
  
    // only enable this in development. It will turn on console logging.
    debug?: boolean;
  }
  
  export interface PinInputProps extends SharedProps {
    // Length of the pin you want
    initialValue?: number | string;
    style?: CSSProperties;
    focus?: boolean;
    onChange: (pin: string, completed: boolean) => any;
    // onComplete: (value: string) => any;
  }
  
  export interface PinItemProps extends SharedProps {
    onBackspace: (index: number) => void;
    onPaste: ((value: string) => void) | null;
    index: number;
    pinValue: { name: string, value: string }
    onItemChange: (value: string) => void
  
  }
  
}

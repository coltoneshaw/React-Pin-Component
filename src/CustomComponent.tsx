import React from 'react';
import { PinInputComponent } from 'react-pin-component';

const disallowedKeys = ['value', 'onKeyDown', 'maxLength', 'onPaste', 'name', 'onBlur', 'onFocusCapture'];
const RenderContent = (props: PinInputComponent) => {
  const { InputComponent, style } = props;
  if (InputComponent) {
    // allowing the incoming component props to override the existing props.

    const hasRestrictedKeys = Object.keys(InputComponent.props).some((r) => disallowedKeys.includes(r));

    if (hasRestrictedKeys) {
      throw Error(`Your input element contains one of the restricted keys - ${disallowedKeys.join()}`);
    }

    // console.log({ inputStyle: InputComponent.props.style, style });
    const componentProps = {
      ...props,
      ...InputComponent.props,
      style: {
        ...InputComponent.props.style,
        // this allows the focus styles to override any incoming styles.
        ...style,
      },
    };
    return React.cloneElement(InputComponent, componentProps);
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input {...props} />;
};

export default RenderContent;

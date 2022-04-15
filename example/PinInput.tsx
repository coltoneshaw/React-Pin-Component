/* eslint-disable react/jsx-props-no-multi-spaces */
import React from 'react';
import PinComponent from '../src/index';

const MfaTokenInput = () => (
  <PinComponent

    // defined length for the pin. This will render a specific number of input boxes.
    length={6}

    // You can choose to take effect on the completed pin here, but also have access to the pin along the way.
    onChange={(pin, completed) => console.log({ pin, completed })}

    // Loading the initial value, but it's not required to be the same length as the pin itself.
    // initialValue={87}

    // A simple function to check the values match. All values come out as strings.
    validate={(value) => Number(value) < 8}

    // Full regex strings supported. This will check if the number validates above AND if it passes the regex string
    // you do not need to use both, just different ways to use it.
    regexCriteria={/^[0-9]*$/}

    // styles for the entire pin component
    style={{
      backgroundColor: 'lightgrey',
    }}

    // styles to be sent directly to the input components.
    inputStyle={{
      backgroundColor: 'darkgrey',
      borderRadius: '50%',
      margin: '5px',
    }}

    // styles to be send and shown only when an input box is in focus.
    inputFocusStyle={{
      border: '2px solid blue',
      // If you want to remove the browser focus outline set this.
      outline: 0,
    }}

    // Adds a divider component into the pin input every 3 values.
    addSplit={{
      component: <h1>-</h1>,
      every: 5,
    }}
  />
);

export default MfaTokenInput;

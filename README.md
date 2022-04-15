A Simple React Pin Component inspired by [React Pin Input](https://github.com/arunghosh/react-pin-input). This has types included and is React v18 supported.

This allows for full customization on the input type rendered, meaning you can use any UI library to style your components.

# Install

```bash
yarn add react-pin-component
npm install react-pin-component.
```

# Pin Props
| Property       | Type             | Description                                                                                         |
|----------------|------------------|-----------------------------------------------------------------------------------------------------|
| length         | number           | Length of the pin                                                                                   |
| validate       | Function         | This function is used to validate the inputs and should return a boolean.                           |
| regexCriteria  | RegExp           | A regex string to check the input by.                                                               |
| initialValue   | number \| string | The initial value to be loaded into the pin input. This does not have to match the length property. |
| style          | CSSProperties    | Additional style properties to add or override to the pin component                                 |
| focus          | boolean          | Choosing whether or not to focus on the first input when rendered                                   |
| onChange       | Function         | This function outputs the current pin and a completed boolean.                                      |
| addSplit       | Object           | Pass in `{component: JSX.Element, every: number}` to add a splitting character.                     |
| inputOptions   | Object           | See table below, this gives options to specify for the input element                                |
| InputComponent | ReactElement     | Include a custom component or `<input />` into here to choose what kind of input is rendered.       |

## Input Options

| Property                 | Type          | Description                                                                   |
|--------------------------|---------------|-------------------------------------------------------------------------------|
| debug                    | boolean       | Opt to include or hide console logs related to the validate and regex checks. |
| removeDefaultInputStyles | boolean       | Removing the styles that come with this package on the input component        |
| inputFocusStyle          | CSSProperties | Custom styles that are only rendered when the input is in focus.              |


# Example

```javascript
import React from 'react';
import PinComponent from 'react-pin-component';

const MfaTokenInput = () => (
  <PinComponent

    // defined length for the pin. This will render a specific number of input boxes.
    length={6}

    // You can choose to take effect on the completed pin here, but also have access to the pin along the way.
    onChange={(pin, completed) => console.log({ pin, completed })}

    // Loading the initial value, but it's not required to be the same length as the pin itself.
    initialValue={87}

    // A simple function to check the values match. All values come out as strings.
    validate={(value) => Number(value) < 8}

    // Full regex strings supported. This will check if the number validates above AND if it passes the regex string
    // you do not need to use both, just different ways to use it.
    regexCriteria={/^[0-9]*$/}

    // styles for the entire pin component
    style={{
      backgroundColor: 'lightgrey',
    }}

    InputComponent={
      <input 
        style={{
          backgroundColor: 'darkgrey',
          borderRadius: '50%',
          margin: '5px',
        }}
        inputMode="numeric"
        pattern="^[a-zA-Z0-9]+$"
        autoComplete='off'
      />
    }

    inputOptions={{
      // styles to be send and shown only when an input box is in focus.
      inputFocusStyle: {
        border: '2px solid blue',
        // If you want to remove the browser focus outline set this.
        outline: 0,
      },
      debug: true
    }}

    // Adds a divider component into the pin input every 3 values.
    addSplit={{
      component: <h1>-</h1>,
      every: 5,
    }}
  />
);

export default MfaTokenInput;

```
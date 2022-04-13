A Simple React Pin Component inspired by [React Pin Input](https://github.com/arunghosh/react-pin-input). This has types included and is React v18 supported.

# Install

```bash
yarn add react-pin-component
npm install react-pin-component.
```

# Pin Props
| Property        | Type              | Description                                                                                         |
|-----------------|-------------------|-----------------------------------------------------------------------------------------------------|
| length          | number            | Length of the pin                                                                                   |
| disabled        | boolean           | Whether pin input is disabled                                                                       |
| secret          | boolean           | Add the `type` of `password` to the input.                                                          |
| type            | numeric \| custom | Pattern checking on whether it's a number or anything.                                              |
| validate        | Function          | This function is used to validate the inputs and should return a boolean.                           |
| inputStyle      | CSSProperties     | Additional style properties to add or override to the pin **input** component                       |
| inputFocusStyle | CSSProperties     | Additional style properties when the input is in focus                                              |
| regexCriteria   | RegExp            | A regex string to check the input by.                                                               |
| ariaLabel       | AriaRole          | Custom Aria roles                                                                                   |
| placeholder     | string            | A placeholder for each input.                                                                       |
| debug           | boolean           | Choose whether to have console.logs shown or not                                                    |
| initialValue    | number \| string  | The initial value to be loaded into the pin input. This does not have to match the length property. |
| style           | CSSProperties     | Additional style properties to add or override to the pin component                                 |
| focus           | boolean           | Choosing whether or not to focus on the first input when rendered                                   |
| onChange        | Function          | This function outputs the current pin and a completed boolean.                                      |
| addSplit        | Object            | Pass in `{component: JSX.Element, every: number}` to add a splitting character.                     |

# Example

```javascript
import React from "react";
import PinComponent from 'react-pin-component';

const MfaTokenInput = () => {
  return (
  <PinComponent 
    length={6} 
    onChange={(pin, completed) => console.log({pin, completed})} 
    initialValue={6}
    validate={(value) => Number(value) < 8}
    regexCriteria={/^[0-9]*$/}
    style={{
      backgroundColor: "lightgrey"
    }}
    inputStyle={{
      backgroundColor: 'darkgrey',
      borderRadius: '50%',
      margin: '5px'
    }}
    inputFocusStyle={{
      border: '2px solid blue',
      // If you want to remove the browser focus outline set this.
      outline:0
    }}
    // Adds a divider component into the pin input every 3 values. 
    addSplit={{
      component: <h1>-</h1>,
      every: 3
    }}
    />
  )

}

export default MfaTokenInput;
```
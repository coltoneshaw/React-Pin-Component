/**
 *
 * @param length Length of the pin
 * @param initialValue Initial value for the pin. Filling blank strings if not the same length
 */
export const fillValues = (length: number, initialValue: number | string) => Array(length)
  .fill('')
  .map((x, i) => ({
    value: initialValue.toString()[i] || x,
    name: `pin${i}`,
  }));

/**
 *
 * @param currentIndex index of the current value that we are moving from
 * @param backwards moving backwards for focus. Usually used for backspace.
 */
export const moveFocus = (currentIndex: number, backwards = false) => {
  let key = currentIndex + 1;
  if (backwards) key = currentIndex - 1;
  // if (key === ) key = length - 1;
  const nextSibling = document.querySelector(`input[name=pin-${key}]`) as HTMLElement;
  if (nextSibling !== null) nextSibling?.focus();
};

/**
 *
 * @param currentIndex index of the current value that we are moving from
 */
export const onBackspace = (currentIndex:number): void => moveFocus(currentIndex, true);

/**
 *
 * @param value Value that needs to be checked
 * @param debug if console debug logging should be output
 * @param validate validate function, needs to return true / false
 * @param regexCriteria regex criteria
 */
export const checkValue = (
  value: string,
  debug?: boolean,
  validate?: (value: string) => boolean,
  regexCriteria?: RegExp,
): string | 'invalid' => {
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
    if (regexCriteria.test(value)) return value;
    if (debug) console.debug('invalid on regex');
    return 'invalid';
  }
  return value;
};

/**
 *
 * @param value Value that needs to be checked
 * @param setValue State update function for the value
 * @param setUpdated State update function to decide of the value has been updated or not.
 *  This is required if the value is the same multiple times.
 * @param debug if console debug logging should be output
 * @param validate validate function, needs to return true / false
 * @param regexCriteria regex criteria
 */
export const checkAndUpdate = (
  value: string,
  setValue: Function,
  setUpdated: Function,
  debug?: boolean,
  validate?: (value: string) => boolean,
  regexCriteria?: RegExp,
): void => {
  const check = checkValue(value, debug, validate, regexCriteria);
  if (check === 'invalid') {
    return;
  }
  setValue(value);
  setUpdated(true);
};

export const addSplitElement = (
  addSplit: { component: JSX.Element, every: number } | undefined,
  valueArray: JSX.Element[],
) => {
  if (addSplit) {
    const splitAdded = [...valueArray];

    // copying original array length because the newArray will expand length and cannot be used.
    const originalLength = valueArray.length;
    const { component, every } = addSplit;
    let numInsertedSplits = 0;
    for (let splitIndex = every; splitIndex < originalLength; splitIndex += every) {
      // incrementing the index by 1 here to account for the inserted split.
      const insertSplitAtIndex = splitIndex + numInsertedSplits;

      // preventing inserting a split at the end.
      if (insertSplitAtIndex < splitAdded.length) {
        splitAdded.splice(insertSplitAtIndex, 0, component);
        numInsertedSplits += 1;
      }
    }

    return splitAdded;
  }
  return valueArray;
};

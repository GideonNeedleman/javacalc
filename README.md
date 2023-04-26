# A JavaScript Calculator

Basic 4 function calculator written in JavaScript that runs in the browser.

There are many ways to program a calculator. This one has 2 displays. The lower display shows the number as you enter the digits as well as the result of a calculation after pressing the '=' button. The smaller, upper display shows previously the previously entered number and the operator. Global JavaScript variables store the values for the previously entered number (operand) and the operator.

It is also possible to 'chain' operations together. When pressing an operator button, any previous calculation will be completed and the result will be displayed in the upper display, along with the new operator you just pressed. So there's no need to press '=' to complete a calculation if you are continuing to chain on additional operations.

## Versions

1.0 - 20230407 - Initial release

1.1 - 20230417 - Update styling

1.2 - 20230418 - Refactored with eventListener instead of onclick

## Known Bugs

~2023040701~ - Result can exceed 12 character limit in display. For example when calculating 2/3 or calculating very large numbers.

~2023040702~ - Pressing '=' to complete calculation when lower display is empty results in NaN error.

2023041801 - Button presses don't work with iphone.

~2023041802~ - pressing CE button has no vibration

20230426 - Pressing decimal point '.' repeatedly will insert multiple decimal points.

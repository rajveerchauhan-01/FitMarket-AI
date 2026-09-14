Generating a 6-digit OTP
To generate a random 6-digit OTP:
Math.floor(Math.random() * 900000) + 100000;
Reasoning:
Math.random() → returns a number in [0, 1).
Multiply by 900000 → range becomes [0, 900000).
Math.floor() → converts it to an integer from 0 to 899999.
Add 100000 → shifts the range to 100000–999999, ensuring the OTP is always 6 digits.
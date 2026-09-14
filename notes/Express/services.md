Responsibilities of registerService()
Check whether email already exists.
Check whether phone number already exists.
Generate a 6-digit OTP.
Hash the user's password before storing it.
Create or update the OTP document.
Reset OTP attempts on every new OTP generation.
Set OTP expiration time (5 minutes).
Send OTP (currently mocked with console.log).
Return a success response.

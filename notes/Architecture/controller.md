Responsibilities of a Controller
A controller should only:
Receive the HTTP request.
Pass data to the appropriate service.
Receive the result from the service.
Send the HTTP response.
Handle unexpected exceptions.
A controller should not contain business logic. Keeping controllers thin makes them easier to read, test, and maintain.

Controllers should return the service's error message when available. Use a generic "Internal server error" only when no specific message exists.

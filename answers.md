--------- Sprint self study questions ---------
1) Mention two parts of Express that you learned about this week. -
Custom middleware and third party packages like helmet, CORS, and morgan.

2) Describe Middleware? -
Functions that can access "the homies" (req, res, next), and can either return some code or modify
the request or response objects.  They can also call the next middleware function (next).

3) Describe a Resource? -
A resource is a unique URI or object/key pair that a request methods calls in order to return a new
stateful response.

4) What can the API return to help clients know if a request was successful? -
A clear and concise http response code with a clear comment that lets the user know if the
request was successful or failed and an explanation of why.

5) How can we partition our application into sub-applications?
Routes via router.

### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
Python:
Server-side scripting, data analysis, machine learning.
Readable syntax, indentation for blocks.
Dynamically typed, strong data science ecosystem.
snake case

JavaScript:
Client-side scripting, web interactivity.
C-like syntax, curly braces for blocks.
Asynchronous focus, extensive web development ecosystem.
camelcase  


- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.
dict_ = {"a": 1, "b": 2}
dict_.get("c") //None
if "c" in dict_:
    result = dict_["c"]
else:
    result= None

- What is a unit test?
unit tests test individual componets on isolation to make sure they work as intended. 

- What is an integration test?
integration tests test how different components of a system work together.

- What is the role of web application framework, like Flask?
web application frameworks help us define *what* requests we should respond too and also *how* we should respond to the requests

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
Choose parameter in route URL for unique identifiers, better readability. 
Choose URL query parameter for optional modifiers or filtering 

- How do you collect data from a URL placeholder parameter using Flask?
you pass the placeholder parameter to the route function

- How do you collect data from the query string using Flask?
request.args.get()

- How do you collect data from the body of the request using Flask?
request.form[]

- What is a cookie and what kinds of things are they commonly used for?
A cookie is a small data piece usually a string sent by a web server to a browser, stored locally. Commonly used for session management, authentication, personalization, shopping carts, tracking, and targeted ad

- What is the session object in Flask?
built-in tool to store and manage user-specific data across requests. It uses cookies to store a unique identifier, allowing user specific information like a users authentication status.

- What does Flask's `jsonify()` do?
creates a JSON response from python dictionaries and sets the correct content type.

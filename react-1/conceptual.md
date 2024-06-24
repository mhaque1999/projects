### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?

React is a JavaScript library for building user interfaces. It's used for creating interactive UIs with reusable components and managing states.

- What is Babel?

Babel is a JavaScript compiler that converts ECMAScript 2015+ (ES6+) code into a version of JavaScript that can be run by older JavaScript engines.

- What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript used with React to describe what the UI should look like.

- How is a Component created in React?

A component in React can be created as either a function component or a class component. Function components are simpler and are declared as JavaScript functions returning JSX. 

- What are some difference between state and props?

State is managed within a component and can be changed while props are passed
to a comonent from its parent to child components.

- What does "downward data flow" refer to in React?

Downward data flow in React refers to the practice of passing data from parent components to child components through props.

- What is a controlled component?

A controlled component in React is a form element whose value is controlled by React through state.

- What is an uncontrolled component?

An uncontrolled component in React is a form element where the form data is handled by the DOM itself, rather than by React state.

- What is the purpose of the `key` prop when rendering a list of components?

The key prop is used to uniquely identify elements in a list of React components. 

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?

It doesn't reliably identify each item uniquely and can cause unexpected behavior.

- Describe useEffect.  What use cases is it used for in React components?

UseEfect is a hook in React used to perform side effects in functional components. It is used for fetching data, updating the DOM, and managing timers.

- What does useRef do?  Does a change to a ref value cause a rerender of a component?

 UseRef creates a mutable object that persists across component renders. Changes to a ref value do not cause a rerender of a component.

- When would you use a ref? When wouldn't you use one?

You would use a ref to access DOM nodes. You wouldn't use it for managing data or state.

- What is a custom hook in React? When would you want to write one?

A custom hook in React is a JavaScript function that starts with "use" and calls other hooks. 

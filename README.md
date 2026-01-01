# React Keep Visible
Keep an element in the viewport (within the bounds of its parent container) while the user scrolls.

Similar to position 'sticky', except it intelligently switches between sticking to the top and bottom 
edge to allow scrolling through the entire element.

[live demo](https://hy8s7j.csb.app/)

[live demo with editor](https://codesandbox.io/p/sandbox/react-keep-visible-demo-hy8s7j)

Vanilla sticky counter example: [demo](https://codesandbox.io/s/keep-visible-counter-demo-sumq9?file=/src/App.js) 


## Installation

`npm install react-keep-visible`

or

`yarn add react-keep-visible`

## Usage

```js
      <KeepVisible top={'css value'} bottom={'css value'}>
        [ element ]
      </KeepVisible>
```

## Notes
- **[ element ]** - and element to keep visible
- **top**, **bottom** - optional. any valid CSS.  ex: `calc(var(--header-height) + 5vh)`.  Will be evaluated in the context of `[ element ]`.  
*This may result in unexpected behavior. Proceed with caution.*

Margins added to the element kept visible will negatively impact positioning.  Try padding instead.

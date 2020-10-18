![React Keep Visible](https://repository-images.githubusercontent.com/257725090/ea52cb00-8486-11ea-80f1-d93c94bf0bea)

# React Keep Visible [BETA]
Keep an element in the viewport (within the bounds of its parent container) while the user scrolls.

Similar to position 'sticky', except it intelligently switches between sticking to the top and bottom 
edge to allow scrolling through the entire element.

[live demo](https://codesandbox.io/s/keep-visible-demo-1x1fw?file=/src/App.js)

Vanilla sticky: [counter demo](https://codesandbox.io/s/keep-visible-counter-demo-sumq9?file=/src/App.js) 


## Installation

`npm install react-keep-visible`

or

`yarn add react-keep-visible`

## Usage

```js
      <KeepVisible>
        [ element ]
      </KeepVisible>
```

## Notes

To do:  support 'top' & 'bottom' offsets.

Margins added to the element kept visible will negatively impact positioning.  Try padding instead.

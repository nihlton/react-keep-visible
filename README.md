![React Keep Visible](https://repository-images.githubusercontent.com/257725090/ea52cb00-8486-11ea-80f1-d93c94bf0bea)

# Edit: just use [position: sticky](https://www.w3schools.com/howto/howto_css_sticky_element.asp)

# React Keep Visisble [BETA]
Keep an element in the viewport (within the bounds of its parent container) while the user scrolls.

Live demo: https://nihlton.github.io/react-keep-visible/

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

Margins added to the element kept visible will negatively impact positioning.  Try padding instead.

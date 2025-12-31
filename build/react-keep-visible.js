"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const STICKY_BOTTOM = 2;
const STICKY_TOP = 1;
const PARENT_STYLE = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
};
const KeepVisible = function (props) {
    const parentRef = (0, react_1.useRef)(null);
    const childRef = (0, react_1.useRef)(null);
    const rulerRef = (0, react_1.useRef)(null);
    const childStickyState = (0, react_1.useRef)(-1);
    const scrollY = (0, react_1.useRef)(window.scrollY);
    const { top = "0", bottom = "0" } = props;
    // If top or bottom is supplied, create an element we can measure CSS values to pixels.
    // Make it a child of the target element so CSS inheritance applies.
    // --vars, and relative units etc.
    (0, react_1.useEffect)(() => {
        const child = childRef.current;
        if ((top || bottom) && child) {
            const ruler = document.createElement("div");
            ruler.style.position = "absolute";
            ruler.style.visibility = "hidden";
            ruler.style.setProperty("height", top);
            ruler.style.setProperty("width", bottom);
            rulerRef.current = ruler;
            child.appendChild(ruler);
            return () => ruler.remove();
        }
    }, [top, bottom]);
    const positionChild = (0, react_1.useCallback)(() => {
        const child = childRef.current;
        const parent = parentRef.current;
        const ruler = rulerRef.current;
        if (!child || !parent) {
            return;
        }
        const parentRect = parent.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();
        const rulerRect = ruler === null || ruler === void 0 ? void 0 : ruler.getBoundingClientRect();
        const offsetTop = rulerRect ? rulerRect.height : 0;
        const offsetBottom = rulerRect ? rulerRect.width : 0;
        const childTop = childRect.top - offsetTop;
        const childHeight = childRect.height + offsetTop + offsetBottom;
        const scrollingUp = scrollY.current > window.scrollY;
        const scrollingDown = scrollY.current < window.scrollY;
        const changeDown = scrollingDown && childStickyState.current === STICKY_TOP;
        const changeUp = scrollingUp && childStickyState.current === STICKY_BOTTOM;
        const changeDirection = changeDown || changeUp;
        const viewPortHeight = window.innerHeight;
        const fitsInViewPort = childHeight < viewPortHeight;
        const childAboveViewBottom = childTop < viewPortHeight - childHeight;
        const childBelowViewTop = childTop > 0;
        const childInMiddle = !childBelowViewTop && !childAboveViewBottom;
        const childEdgeInView = childBelowViewTop || childAboveViewBottom;
        if (fitsInViewPort) {
            parent.style.justifyContent = "";
            child.style.position = "sticky";
            child.style.top = top;
            child.style.bottom = "";
            return;
        }
        const childStyle = {};
        const parentStyle = Object.assign({}, PARENT_STYLE);
        if (changeDirection && childInMiddle) {
            childStickyState.current = false;
            parentStyle.justifyContent = "";
            childStyle.position = "relative";
            childStyle.top = childRect.top - parentRect.top + "px";
            childStyle.bottom = "";
        }
        if (scrollingDown && childEdgeInView) {
            childStickyState.current = STICKY_BOTTOM;
            parentStyle.justifyContent = "flex-end";
            childStyle.position = "sticky";
            childStyle.bottom = bottom;
            childStyle.top = "";
        }
        if (scrollingUp && childEdgeInView) {
            childStickyState.current = STICKY_TOP;
            parentStyle.justifyContent = "";
            childStyle.position = "sticky";
            childStyle.top = top;
            childStyle.bottom = "";
        }
        Object.assign(parent.style, parentStyle);
        Object.assign(child.style, childStyle);
        scrollY.current = window.scrollY;
    }, [top, bottom]);
    (0, react_1.useEffect)(() => {
        window.addEventListener("scroll", positionChild, { passive: true });
        window.addEventListener("resize", positionChild, { passive: true });
        positionChild();
        return () => {
            window.removeEventListener("scroll", positionChild);
            window.removeEventListener("resize", positionChild);
        };
    }, [positionChild]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: parentRef, style: { height: "100%" }, children: (0, jsx_runtime_1.jsx)("div", { ref: childRef, children: props.children }) }));
};
exports.default = KeepVisible;
//# sourceMappingURL=react-keep-visible.js.map
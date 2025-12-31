import { jsx as j } from "react/jsx-runtime";
import { useRef as r, useEffect as B, useCallback as H } from "react";
const S = 2, x = 1, K = {
  height: "100%",
  display: "flex",
  flexDirection: "column"
}, A = function(w) {
  const y = r(null), u = r(null), a = r(null), s = r(-1), h = r(window.scrollY), { top: o = "0", bottom: c = "0" } = w;
  B(() => {
    const n = u.current;
    if ((o || c) && n) {
      const t = document.createElement("div");
      return t.style.position = "absolute", t.style.visibility = "hidden", t.style.setProperty("height", o), t.style.setProperty("width", c), a.current = t, n.appendChild(t), () => t.remove();
    }
  }, [o, c]);
  const i = H(() => {
    const n = u.current, t = y.current, p = a.current;
    if (!n || !t)
      return;
    const P = t.getBoundingClientRect(), f = n.getBoundingClientRect(), l = p == null ? void 0 : p.getBoundingClientRect(), g = l ? l.height : 0, k = l ? l.width : 0, m = f.top - g, v = f.height + g + k, b = h.current > window.scrollY, C = h.current < window.scrollY, I = C && s.current === x, L = b && s.current === S, O = I || L, R = window.innerHeight, V = v < R, T = m < R - v, E = m > 0, D = !E && !T, Y = E || T;
    if (V) {
      t.style.justifyContent = "", n.style.position = "sticky", n.style.top = o, n.style.bottom = "";
      return;
    }
    const e = {}, d = { ...K };
    O && D && (s.current = !1, d.justifyContent = "", e.position = "relative", e.top = f.top - P.top + "px", e.bottom = ""), C && Y && (s.current = S, d.justifyContent = "flex-end", e.position = "sticky", e.bottom = c, e.top = ""), b && Y && (s.current = x, d.justifyContent = "", e.position = "sticky", e.top = o, e.bottom = ""), Object.assign(t.style, d), Object.assign(n.style, e), h.current = window.scrollY;
  }, [o, c]);
  return B(() => (window.addEventListener("scroll", i, { passive: !0 }), window.addEventListener("resize", i, { passive: !0 }), i(), () => {
    window.removeEventListener("scroll", i), window.removeEventListener("resize", i);
  }), [i]), /* @__PURE__ */ j("div", { ref: y, style: { height: "100%" }, children: /* @__PURE__ */ j("div", { ref: u, children: w.children }) });
};
export {
  A as default
};

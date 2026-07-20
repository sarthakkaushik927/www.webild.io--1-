import { o as e, t } from "./jsx-runtime-9YgKe2Eq.js";
import { t as n } from "./react-CM_0bdEm.js";
import { t as r } from "./proxy-DH7XULpl.js";
import { t as i } from "./Button-DfW8ZzOt.js";
import { t as a } from "./TextAnimation-rGMWp5lm.js";
import { t as o } from "./ImageOrVideo-B7bL8acW.js";
import { t as s } from "./HeroBackgroundSlot-DajlRGCm.js";
var c = e(n(), 1),
  l = t(),
  u = ({ items: e, autoPlayInterval: t = 4e3 }) => {
    let [n, i] = (0, c.useState)(0),
      [a, s] = (0, c.useState)(!0),
      u = (0, c.useRef)(null),
      d = e.length;
    return (
      (0, c.useEffect)(() => {
        if (a) {
          let e = setTimeout(() => s(!1), 800);
          return () => clearTimeout(e);
        }
      }, [a]),
      (0, c.useEffect)(
        () => (
          u.current && clearInterval(u.current),
          (u.current = setInterval(() => {
            i((e) => (e + 1) % d);
          }, t)),
          () => {
            u.current && clearInterval(u.current);
          }
        ),
        [t, d]
      ),
      (0, l.jsxs)(`div`, {
        className: `relative flex items-center justify-center w-full overflow-hidden`,
        children: [
          (0, l.jsx)(`div`, {
            className: `w-[70%] md:w-[40%] aspect-square md:aspect-video opacity-0`,
          }),
          [-2, -1, 0, 1, 2].map((t) => {
            let i = (n + t + d) % d,
              s = e[i],
              c = t === 0,
              u = Math.abs(t),
              f = u === 0 ? 1 : u === 1 ? 0.88 : 0.8,
              p = +(u <= 1),
              m = t * 100,
              h = u === 0 ? 0 : u === 1 ? 5 : 10,
              g = t * 2,
              _ =
                u <= 1 && a
                  ? c
                    ? { opacity: 0, y: `25px`, scale: 1, x: `0%`, rotate: 0 }
                    : {
                        opacity: 0,
                        scale: 0.88,
                        x: `calc(${m}% + ${t > 0 ? 20 : -20}px)`,
                        y: `5%`,
                        rotate: g,
                      }
                  : { scale: f, opacity: p, x: `${m}%`, y: `${h}%`, rotate: g };
            return (0, l.jsxs)(
              r.div,
              {
                className: `absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-hidden`,
                style: { zIndex: c ? 10 : 5 - u },
                initial: _,
                animate: {
                  scale: f,
                  opacity: p,
                  x: `${m}%`,
                  y: `${h}%`,
                  rotate: g,
                },
                transition: {
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1],
                  delay: u <= 1 && a ? (c ? 0.45 : 0.6) : 0,
                },
                children: [
                  (0, l.jsx)(o, {
                    imageSrc: s.imageSrc,
                    videoSrc: s.videoSrc,
                    className: `w-full h-full rounded-lg object-cover`,
                  }),
                  (0, l.jsx)(r.div, {
                    className: `absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none`,
                    initial: { opacity: +!c },
                    animate: { opacity: +!c },
                    transition: { duration: 0.5, ease: `easeInOut` },
                  }),
                ],
              },
              i
            );
          }),
        ],
      })
    );
  },
  d = ({
    tag: e,
    title: t,
    description: n,
    primaryButton: r,
    secondaryButton: o,
    items: c,
    textAnimation: d,
  }) =>
    (0, l.jsxs)(`section`, {
      "aria-label": `Hero section`,
      className: `relative flex flex-col items-center justify-center gap-8 md:gap-10 w-full min-h-svh pt-25 pb-20 md:pt-30`,
      children: [
        (0, l.jsx)(s, {}),
        (0, l.jsxs)(`div`, {
          className: `flex flex-col items-center gap-3 w-content-width mx-auto text-center`,
          children: [
            (0, l.jsx)(`div`, {
              className: `px-3 py-1 mb-1 text-sm card rounded w-fit`,
              children: (0, l.jsx)(`p`, { children: e }),
            }),
            (0, l.jsx)(a, {
              text: t,
              variant: d,
              gradientText: !0,
              tag: `h1`,
              className: `md:max-w-8/10 text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-center text-balance`,
            }),
            (0, l.jsx)(a, {
              text: n,
              variant: d,
              gradientText: !1,
              tag: `p`,
              className: `md:max-w-7/10 text-lg md:text-xl leading-snug text-balance`,
            }),
            (0, l.jsxs)(`div`, {
              className: `flex flex-wrap justify-center gap-3 mt-2 md:mt-3`,
              children: [
                (0, l.jsx)(i, {
                  text: r.text,
                  href: r.href,
                  variant: `primary`,
                }),
                (0, l.jsx)(i, {
                  text: o.text,
                  href: o.href,
                  variant: `secondary`,
                  animationDelay: 0.1,
                }),
              ],
            }),
          ],
        }),
        (0, l.jsx)(u, { items: c }),
      ],
    });
export { d as t };

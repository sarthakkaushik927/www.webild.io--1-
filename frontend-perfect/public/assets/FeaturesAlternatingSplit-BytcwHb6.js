import { o as e, t } from "./jsx-runtime-9YgKe2Eq.js";
import { t as n } from "./react-CM_0bdEm.js";
import { t as r } from "./utils-EIHTpZTP.js";
import { t as i } from "./Button-DfW8ZzOt.js";
import { t as a } from "./TextAnimation-rGMWp5lm.js";
import { t as o } from "./ImageOrVideo-B7bL8acW.js";
import { t as s } from "./gsap-DJZDW1A8.js";
import { t as c } from "./ScrollTrigger-BvUk3D8C.js";
var l = e(n(), 1),
  u = t();
s.registerPlugin(c);
var d = ({
  tag: e,
  title: t,
  description: n,
  primaryButton: c,
  secondaryButton: d,
  items: f,
  textAnimation: p,
}) => {
  let m = (0, l.useRef)([]);
  return (
    (0, l.useEffect)(() => {
      let e = s.context(() => {
        m.current.forEach((e, t) => {
          if (!e) return;
          let n = t === m.current.length - 1;
          s.timeline({
            scrollTrigger: {
              trigger: e,
              start: `center center`,
              end: `+=100%`,
              scrub: !0,
            },
          })
            .set(e, { willChange: `opacity` })
            .to(e, { ease: `none`, opacity: +!!n });
        });
      });
      return () => e.revert();
    }, [f.length]),
    (0, u.jsx)(`section`, {
      "aria-label": `Features section`,
      className: `py-20`,
      children: (0, u.jsxs)(`div`, {
        className: `flex flex-col gap-8 md:gap-10`,
        children: [
          (0, u.jsxs)(`div`, {
            className: `flex flex-col items-center w-content-width mx-auto gap-2`,
            children: [
              (0, u.jsx)(`div`, {
                className: `px-3 py-1 mb-1 text-sm card rounded w-fit`,
                children: (0, u.jsx)(`p`, { children: e }),
              }),
              (0, u.jsx)(a, {
                text: t,
                variant: p,
                gradientText: !0,
                tag: `h2`,
                className: `md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance`,
              }),
              (0, u.jsx)(a, {
                text: n,
                variant: p,
                gradientText: !1,
                tag: `p`,
                className: `md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance`,
              }),
              (c || d) &&
                (0, u.jsxs)(`div`, {
                  className: `flex flex-wrap justify-center gap-3 mt-2 md:mt-3`,
                  children: [
                    c &&
                      (0, u.jsx)(i, {
                        text: c.text,
                        href: c.href,
                        variant: `primary`,
                      }),
                    d &&
                      (0, u.jsx)(i, {
                        text: d.text,
                        href: d.href,
                        variant: `secondary`,
                        animationDelay: 0.1,
                      }),
                  ],
                }),
            ],
          }),
          (0, u.jsx)(`div`, {
            className: `flex flex-col gap-5 md:gap-[6vh] w-content-width mx-auto`,
            children: f.map((e, t) =>
              (0, u.jsxs)(
                `div`,
                {
                  ref: (e) => {
                    m.current[t] = e;
                  },
                  className: r(
                    `sticky top-[25vw] md:top-[12.5vh] h-[140vw] md:h-[75vh] flex flex-col gap-6 md:gap-10 p-6 md:p-10 card rounded`,
                    t % 2 == 0 ? `md:flex-row` : `md:flex-row-reverse`
                  ),
                  children: [
                    (0, u.jsxs)(`div`, {
                      className: `flex flex-col justify-center w-full md:w-1/2 gap-2`,
                      children: [
                        (0, u.jsx)(`div`, {
                          className: `flex items-center justify-center size-9 mb-1 text-sm rounded primary-button text-primary-cta-text`,
                          children: (0, u.jsx)(`p`, { children: t + 1 }),
                        }),
                        (0, u.jsx)(`h3`, {
                          className: `text-4xl md:text-5xl font-semibold leading-[1.15] text-balance`,
                          children: e.title,
                        }),
                        (0, u.jsx)(`p`, {
                          className: `text-base md:text-lg leading-snug text-balance`,
                          children: e.description,
                        }),
                        (e.primaryButton || e.secondaryButton) &&
                          (0, u.jsxs)(`div`, {
                            className: `flex flex-wrap gap-3 mt-2 md:mt-3`,
                            children: [
                              e.primaryButton &&
                                (0, u.jsx)(i, {
                                  text: e.primaryButton.text,
                                  href: e.primaryButton.href,
                                  variant: `primary`,
                                }),
                              e.secondaryButton &&
                                (0, u.jsx)(i, {
                                  text: e.secondaryButton.text,
                                  href: e.secondaryButton.href,
                                  variant: `secondary`,
                                }),
                            ],
                          }),
                      ],
                    }),
                    (0, u.jsx)(`div`, {
                      className: `w-full md:w-1/2 aspect-square rounded overflow-hidden`,
                      children: (0, u.jsx)(o, {
                        imageSrc: e.imageSrc,
                        videoSrc: e.videoSrc,
                      }),
                    }),
                  ],
                },
                e.title
              )
            ),
          }),
        ],
      }),
    })
  );
};
export { d as t };

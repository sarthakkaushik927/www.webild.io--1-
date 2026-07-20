import { o as e, t } from "./jsx-runtime-9YgKe2Eq.js";
import { t as n } from "./react-CM_0bdEm.js";
import { x as r } from "./lucide-react-BAD9fcv4.js";
import { t as i } from "./proxy-DH7XULpl.js";
import { t as a } from "./AnimatePresence-DdTLBsbs.js";
import { t as o } from "./ScrollReveal-CIZjf2Bh.js";
import { t as s } from "./utils-EIHTpZTP.js";
import { t as c } from "./Button-DfW8ZzOt.js";
import { t as l } from "./TextAnimation-rGMWp5lm.js";
import { t as u } from "./ImageOrVideo-B7bL8acW.js";
var d = e(n(), 1),
  f = t(),
  p = ({
    tag: e,
    title: t,
    description: n,
    primaryButton: p,
    secondaryButton: m,
    items: h,
    imageSrc: g,
    videoSrc: _,
    textAnimation: v,
  }) => {
    let [y, b] = (0, d.useState)(null),
      x = (e) => {
        b(y === e ? null : e);
      };
    return (0, f.jsx)(`section`, {
      "aria-label": `FAQ section`,
      className: `py-20`,
      children: (0, f.jsxs)(`div`, {
        className: `w-content-width mx-auto flex flex-col gap-8 md:gap-10`,
        children: [
          (0, f.jsxs)(`div`, {
            className: `flex flex-col items-center gap-2`,
            children: [
              (0, f.jsx)(`div`, {
                className: `px-3 py-1 mb-1 text-sm card rounded w-fit`,
                children: (0, f.jsx)(`p`, { children: e }),
              }),
              (0, f.jsx)(l, {
                text: t,
                variant: v,
                gradientText: !0,
                tag: `h2`,
                className: `md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance`,
              }),
              (0, f.jsx)(l, {
                text: n,
                variant: v,
                gradientText: !1,
                tag: `p`,
                className: `md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance`,
              }),
              (p || m) &&
                (0, f.jsxs)(`div`, {
                  className: `flex flex-wrap justify-center gap-3 mt-2 md:mt-3`,
                  children: [
                    p &&
                      (0, f.jsx)(c, {
                        text: p.text,
                        href: p.href,
                        variant: `primary`,
                      }),
                    m &&
                      (0, f.jsx)(c, {
                        text: m.text,
                        href: m.href,
                        variant: `secondary`,
                        animationDelay: 0.1,
                      }),
                  ],
                }),
            ],
          }),
          (0, f.jsxs)(`div`, {
            className: `grid grid-cols-1 md:grid-cols-5 gap-5`,
            children: [
              (0, f.jsx)(o, {
                variant: `slide-up`,
                className: `card relative md:col-span-2 h-80 md:h-auto rounded overflow-hidden`,
                children: (0, f.jsx)(u, {
                  imageSrc: g,
                  videoSrc: _,
                  className: `absolute inset-0 size-full object-cover`,
                }),
              }),
              (0, f.jsx)(o, {
                variant: `slide-up`,
                delay: 0.1,
                className: `md:col-span-3 flex flex-col gap-3 xl:gap-3.5 2xl:gap-4`,
                children: h.map((e, t) =>
                  (0, f.jsxs)(
                    `div`,
                    {
                      onClick: () => x(t),
                      className: `p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none`,
                      children: [
                        (0, f.jsxs)(`div`, {
                          className: `flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4`,
                          children: [
                            (0, f.jsx)(`h3`, {
                              className: `text-lg md:text-xl font-medium leading-snug`,
                              children: e.question,
                            }),
                            (0, f.jsx)(`div`, {
                              className: `flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button`,
                              children: (0, f.jsx)(r, {
                                className: s(
                                  `size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300`,
                                  y === t && `rotate-45`
                                ),
                                strokeWidth: 2,
                              }),
                            }),
                          ],
                        }),
                        (0, f.jsx)(a, {
                          initial: !1,
                          children:
                            y === t &&
                            (0, f.jsx)(i.div, {
                              initial: { height: 0, opacity: 0 },
                              animate: { height: `auto`, opacity: 1 },
                              exit: { height: 0, opacity: 0 },
                              transition: { duration: 0.3, ease: `easeOut` },
                              className: `overflow-hidden`,
                              children: (0, f.jsx)(`p`, {
                                className: `pt-1 text-base leading-snug`,
                                children: e.answer,
                              }),
                            }),
                        }),
                      ],
                    },
                    t
                  )
                ),
              }),
            ],
          }),
        ],
      }),
    });
  };
export { p as t };

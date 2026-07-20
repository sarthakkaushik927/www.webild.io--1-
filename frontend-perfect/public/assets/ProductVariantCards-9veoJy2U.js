import { t as e } from "./jsx-runtime-9YgKe2Eq.js";
import { P as t, ct as n } from "./lucide-react-BAD9fcv4.js";
import { t as r } from "./ScrollReveal-CIZjf2Bh.js";
import { t as i } from "./Button-DfW8ZzOt.js";
import { t as a } from "./TextAnimation-rGMWp5lm.js";
import { t as o } from "./GridOrCarousel-CqQVM6kH.js";
import { t as s } from "./ImageOrVideo-B7bL8acW.js";
import { t as c } from "./useProducts-aeUPbion.js";
var l = e(),
  u = ({
    tag: e,
    title: u,
    description: d,
    primaryButton: f,
    secondaryButton: p,
    textAnimation: m,
    products: h,
  }) => {
    let { products: g, isLoading: _ } = c(),
      v =
        g.length > 0
          ? g.map((e) => ({
              name: e.name,
              variant: e.variant || ``,
              price: e.price,
              imageSrc: e.imageSrc,
              onClick: e.onProductClick,
            }))
          : h;
    return _ && !h
      ? (0, l.jsx)(`section`, {
          "aria-label": `Products section`,
          className: `py-20`,
          children: (0, l.jsx)(`div`, {
            className: `w-content-width mx-auto flex justify-center`,
            children: (0, l.jsx)(t, {
              className: `size-8 animate-spin text-foreground`,
              strokeWidth: 1.5,
            }),
          }),
        })
      : !v || v.length === 0
      ? null
      : (0, l.jsx)(`section`, {
          "aria-label": `Products section`,
          className: `py-20`,
          children: (0, l.jsxs)(`div`, {
            className: `flex flex-col gap-8 md:gap-10`,
            children: [
              (0, l.jsxs)(`div`, {
                className: `flex flex-col items-center w-content-width mx-auto gap-2`,
                children: [
                  (0, l.jsx)(`div`, {
                    className: `px-3 py-1 mb-1 text-sm card rounded w-fit`,
                    children: (0, l.jsx)(`p`, { children: e }),
                  }),
                  (0, l.jsx)(a, {
                    text: u,
                    variant: m,
                    gradientText: !0,
                    tag: `h2`,
                    className: `md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance`,
                  }),
                  (0, l.jsx)(a, {
                    text: d,
                    variant: m,
                    gradientText: !1,
                    tag: `p`,
                    className: `md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance`,
                  }),
                  (f || p) &&
                    (0, l.jsxs)(`div`, {
                      className: `flex flex-wrap justify-center gap-3 mt-2 md:mt-3`,
                      children: [
                        f &&
                          (0, l.jsx)(i, {
                            text: f.text,
                            href: f.href,
                            variant: `primary`,
                          }),
                        p &&
                          (0, l.jsx)(i, {
                            text: p.text,
                            href: p.href,
                            variant: `secondary`,
                            animationDelay: 0.1,
                          }),
                      ],
                    }),
                ],
              }),
              (0, l.jsx)(r, {
                variant: `slide-up`,
                children: (0, l.jsx)(o, {
                  children: v.map((e) =>
                    (0, l.jsxs)(
                      `button`,
                      {
                        onClick: e.onClick,
                        className: `group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer`,
                        children: [
                          (0, l.jsxs)(`div`, {
                            className: `relative aspect-square rounded overflow-hidden`,
                            children: [
                              (0, l.jsx)(s, {
                                imageSrc: e.imageSrc,
                                className: `size-full object-cover transition-transform duration-500 group-hover:scale-105`,
                              }),
                              (0, l.jsx)(`div`, {
                                className: `absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300`,
                                children: (0, l.jsx)(`div`, {
                                  className: `flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300`,
                                  children: (0, l.jsx)(n, {
                                    className: `size-5 text-primary-cta-text`,
                                    strokeWidth: 2,
                                  }),
                                }),
                              }),
                            ],
                          }),
                          (0, l.jsxs)(`div`, {
                            className: `flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4`,
                            children: [
                              (0, l.jsxs)(`div`, {
                                className: `flex flex-col gap-1 flex-1 min-w-0`,
                                children: [
                                  (0, l.jsx)(`h3`, {
                                    className: `text-2xl font-semibold truncate leading-snug text-balance`,
                                    children: e.name,
                                  }),
                                  (0, l.jsx)(`p`, {
                                    className: `text-base text-foreground/75 truncate`,
                                    children: e.variant,
                                  }),
                                ],
                              }),
                              (0, l.jsx)(`span`, {
                                className: `text-xl font-medium shrink-0`,
                                children: e.price,
                              }),
                            ],
                          }),
                        ],
                      },
                      e.name
                    )
                  ),
                }),
              }),
            ],
          }),
        });
  };
export { u as t };

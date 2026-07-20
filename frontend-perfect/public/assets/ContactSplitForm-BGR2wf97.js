import { o as e, t } from "./jsx-runtime-9YgKe2Eq.js";
import { t as n } from "./react-CM_0bdEm.js";
import { t as r } from "./ScrollReveal-CIZjf2Bh.js";
import { t as i } from "./TextAnimation-rGMWp5lm.js";
import { t as a } from "./ImageOrVideo-B7bL8acW.js";
import { t as o } from "./email-BF4CCPLZ.js";
var s = e(n(), 1),
  c = t(),
  l = ({
    tag: e,
    title: t,
    description: n,
    inputs: l,
    textarea: u,
    buttonText: d,
    onSubmit: f,
    imageSrc: p,
    videoSrc: m,
    textAnimation: h,
  }) => {
    let [g, _] = (0, s.useState)(() => {
        let e = {};
        return (
          l.forEach((t) => {
            e[t.name] = ``;
          }),
          u && (e[u.name] = ``),
          e
        );
      }),
      [v, y] = (0, s.useState)(!1),
      [b, x] = (0, s.useState)(null);
    return (0, c.jsx)(`section`, {
      "aria-label": `Contact section`,
      className: `py-20`,
      children: (0, c.jsx)(`div`, {
        className: `w-content-width mx-auto`,
        children: (0, c.jsxs)(r, {
          variant: `slide-up`,
          className: `grid grid-cols-1 md:grid-cols-2 gap-5`,
          children: [
            (0, c.jsx)(`div`, {
              className: `p-6 md:p-10 card rounded`,
              children: (0, c.jsxs)(`form`, {
                onSubmit: async (e) => {
                  e.preventDefault(), y(!0), x(null);
                  try {
                    await o({ formData: g }), f?.(g);
                    let e = {};
                    l.forEach((t) => {
                      e[t.name] = ``;
                    }),
                      u && (e[u.name] = ``),
                      _(e);
                  } catch (e) {
                    x(
                      e instanceof Error
                        ? e.message
                        : `Failed to send. Please try again.`
                    );
                  } finally {
                    y(!1);
                  }
                },
                className: `flex flex-col gap-6`,
                children: [
                  (0, c.jsxs)(`div`, {
                    className: `flex flex-col items-center gap-2 text-center`,
                    children: [
                      (0, c.jsx)(`div`, {
                        className: `px-3 py-1 mb-1 text-sm card rounded w-fit`,
                        children: (0, c.jsx)(`p`, { children: e }),
                      }),
                      (0, c.jsx)(i, {
                        text: t,
                        variant: h,
                        gradientText: !0,
                        tag: `h2`,
                        className: `text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-balance`,
                      }),
                      (0, c.jsx)(i, {
                        text: n,
                        variant: h,
                        gradientText: !1,
                        tag: `p`,
                        className: `text-lg md:text-xl leading-snug text-balance`,
                      }),
                    ],
                  }),
                  (0, c.jsxs)(`div`, {
                    className: `flex flex-col gap-3`,
                    children: [
                      l.map((e) =>
                        (0, c.jsx)(
                          `input`,
                          {
                            type: e.type,
                            placeholder: e.placeholder,
                            value: g[e.name] || ``,
                            onChange: (t) =>
                              _({ ...g, [e.name]: t.target.value }),
                            required: e.required,
                            "aria-label": e.placeholder,
                            className: `w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded`,
                          },
                          e.name
                        )
                      ),
                      u &&
                        (0, c.jsx)(`textarea`, {
                          placeholder: u.placeholder,
                          value: g[u.name] || ``,
                          onChange: (e) =>
                            _({ ...g, [u.name]: e.target.value }),
                          required: u.required,
                          rows: u.rows || 5,
                          "aria-label": u.placeholder,
                          className: `w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none resize-none card rounded`,
                        }),
                      (0, c.jsx)(`button`, {
                        type: `submit`,
                        disabled: v,
                        className: `flex items-center justify-center w-full h-10 px-6 text-sm primary-button text-primary-cta-text rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,
                        children: v ? `Sending...` : d,
                      }),
                      b &&
                        (0, c.jsx)(`p`, {
                          className: `text-sm text-red-500 text-center`,
                          children: b,
                        }),
                    ],
                  }),
                ],
              }),
            }),
            (0, c.jsx)(`div`, {
              className: `h-100 md:h-auto card rounded overflow-hidden`,
              children: (0, c.jsx)(a, {
                imageSrc: p,
                videoSrc: m,
                className: `size-full object-cover rounded`,
              }),
            }),
          ],
        }),
      }),
    });
  };
export { l as t };

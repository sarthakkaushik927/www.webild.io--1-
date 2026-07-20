import { o as e } from "./jsx-runtime-9YgKe2Eq.js";
import { t } from "./react-CM_0bdEm.js";
import { n } from "./product-Cl-En9FM.js";
var r = e(t(), 1),
  i = () => {
    let [e, t] = (0, r.useState)([]),
      [i, a] = (0, r.useState)(!0),
      [o, s] = (0, r.useState)(null);
    return (
      (0, r.useEffect)(() => {
        let e = !0;
        return (
          (async () => {
            try {
              let r = await n();
              e && t(r);
            } catch (t) {
              e &&
                s(t instanceof Error ? t : Error(`Failed to fetch products`));
            } finally {
              e && a(!1);
            }
          })(),
          () => {
            e = !1;
          }
        );
      }, []),
      { products: e, isLoading: i, error: o }
    );
  };
export { i as t };

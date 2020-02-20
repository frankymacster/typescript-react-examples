// https://www.npmjs.com/package/@housinganywhere/match

type Matcher0<T extends string, R> = { [K in T]: () => R };

type Matcher1<T extends string, R> = { [K in T]: (k: K) => R };

type Matcher2<T extends string, R> = { [K in T]: (k: K, r: R) => R };

export const match0 = <T extends string, R = void>(m: Matcher0<T, R>) => (
  t: T
) => m[t]();

const match = <T extends string, R = void>(m: Matcher1<T, R>) => (t: T) =>
  m[t](t);

export const match2 = <T extends string, R = void>(m: Matcher2<T, R>) => (
  t: T,
  r: R
) => m[t](t, r);

export default match;

type PartialMatcher<T extends string, R> = { [K in T]?: (k: K) => R } & {
  _: (t: T) => R;
};

export const wildMatch = <T extends string, R = void>(
  m: PartialMatcher<T, R>
) => (t: T) => {
  const f = m[t];

  if (f) {
    return f(t);
  }

  return m._(t);
};

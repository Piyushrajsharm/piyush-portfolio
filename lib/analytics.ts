const keyPrefix = "piyush-portfolio";

export function incrementLocalMetric(key: string) {
  if (typeof window === "undefined") return 0;
  const storageKey = `${keyPrefix}:${key}`;
  const nextValue = Number(window.localStorage.getItem(storageKey) ?? "0") + 1;
  window.localStorage.setItem(storageKey, String(nextValue));
  return nextValue;
}

export function readLocalMetric(key: string) {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(`${keyPrefix}:${key}`) ?? "0");
}

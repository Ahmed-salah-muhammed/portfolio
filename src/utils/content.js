// The data files carry `TODO` markers for facts Ahmed has not confirmed yet.
// Nothing containing one may ever reach the UI.
export const hasTodo = (value) =>
  typeof value === 'string' && value.toUpperCase().includes('TODO');

/** Returns the value only when it is real, confirmed content. */
export const safeText = (value) => (!value || hasTodo(value) ? null : value);

/** Only `http(s)` links are real links — the data also holds prose in some url fields. */
export const safeUrl = (value) =>
  typeof value === 'string' && /^https?:\/\//i.test(value.trim()) ? value.trim() : null;

/** Lists the TODO-bearing fields of an object, for the dev-only console warning. */
export const todoFields = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => hasTodo(v))
    .map(([k]) => k);

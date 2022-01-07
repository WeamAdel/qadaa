/**
 * Gets previously chosen theme.
 */
export function getCachedTheme(): string | null {
  return localStorage.getItem("theme");
}

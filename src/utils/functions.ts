export function checkRouterElement(
  element: string | string[] | undefined,
  defaultValue: string
) {
  return Array.isArray(element) ? element[0] : element ? element : defaultValue;
}

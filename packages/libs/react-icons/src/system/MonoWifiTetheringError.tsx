import type { SVGProps } from 'react';
import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoWifiTetheringError = (
  { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-style="mono"
    viewBox="0 0 24 24"
    fontSize="1.5em"
    fill="currentColor"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12 7c-3.31 0-6 2.69-6 6 0 1.66.68 3.15 1.76 4.24l1.42-1.42A3.93 3.93 0 0 1 8 13c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.11-.45 2.1-1.18 2.82l1.42 1.42A6 6 0 0 0 18 13c0-3.31-2.69-6-6-6m0-4C6.48 3 2 7.48 2 13c0 2.76 1.12 5.26 2.93 7.07l1.42-1.42A7.94 7.94 0 0 1 4 13c0-4.42 3.58-8 8-8 2.53 0 4.78 1.17 6.24 3h2.42C18.93 5.01 15.7 3 12 3m0 8c-1.1 0-2 .9-2 2 0 .55.23 1.05.59 1.41s.86.59 1.41.59 1.05-.23 1.41-.59.59-.86.59-1.41c0-1.1-.9-2-2-2m8-1h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);
export default MonoWifiTetheringError;

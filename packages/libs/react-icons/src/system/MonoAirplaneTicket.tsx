import type { SVGProps } from 'react';
import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoAirplaneTicket = (
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
    <path d="M20.19 4H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.81-2-1.81-2m-2.46 9.3-8.86 2.36-1.66-2.88.93-.25 1.26.99 2.39-.64-2.4-4.16 1.4-.38 4.01 3.74 2.44-.65a.967.967 0 0 1 1.18.68.99.99 0 0 1-.69 1.19" />
  </svg>
);
export default MonoAirplaneTicket;

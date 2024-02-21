import type { SVGProps } from 'react';
import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const MonoSignature = (
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
    <path d="M22 22H2v-2h20zM6.2 17.3l-.7.7-1.4-1.4L2.7 18l-.7-.7 1.4-1.4L2 14.5l.7-.7 1.4 1.4 1.4-1.4.7.7-1.4 1.4zm10.02-2.87c0-.58-.72-1.23-2.16-1.97-1.83-.92-3.06-1.67-3.7-2.22-.65-.56-.97-1.18-.97-1.87 0-1.78.91-3.25 2.73-4.42s3.31-1.76 4.45-1.76c.74 0 1.28.13 1.61.39.32.25.5.69.5 1.32 0 .28-.12.52-.37.73-.24.2-.44.3-.57.3-.11 0-.31-.1-.61-.29l-.58-.26c-.47 0-1.41.33-2.84 1q-2.13.99-2.13 2.25c0 .51.24.97.74 1.37.5.42 1.39.93 2.68 1.53 1.03.47 1.86.97 2.5 1.54.6.54.91 1.18.91 1.93 0 1.34-.94 2.41-2.83 3.17-1.88.77-3.68 1.15-5.39 1.15-1.44 0-2.19-.49-2.19-1.46 0-.36.19-.59.5-.75.33-.16.66-.24 1-.24l.75.13.72.13c.98 0 2.03-.16 3.16-.49 1.13-.32 1.83-.73 2.09-1.21" />
  </svg>
);
export default MonoSignature;

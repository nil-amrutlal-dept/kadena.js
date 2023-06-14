import * as commentMarkers from './commentMarkers/index.js';
import { handleCommentMarkers } from './handleCommentMarkers.js';

import remarkFrontMatter from 'remark-frontmatter';
import remarkGFM from 'remark-gfm';
import remarkOrderLinks from 'remark-order-reference-links';
import remarkParse from 'remark-parse';
import remarkPrettier from 'remark-prettier';
import remarkReferenceLinks from 'remark-reference-links';
import type { Preset } from 'unified';

const remarkPresetKadena: Preset = {
  settings: {},
  plugins: [
    remarkFrontMatter,
    // @ts-ignore
    remarkParse,
    [handleCommentMarkers, commentMarkers],
    remarkPrettier,
    remarkGFM,
    remarkReferenceLinks,
    remarkOrderLinks,
  ],
};

export default remarkPresetKadena;

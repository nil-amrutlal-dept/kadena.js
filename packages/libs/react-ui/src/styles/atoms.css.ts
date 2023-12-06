import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import mapValues from 'lodash.mapvalues';
import { breakpoints, flattenTokens } from './themeUtils';
import { tokens } from './tokens/contract.css';

const systemProperties = defineProperties({
  properties: {
    background: ['none'],
    backgroundColor: {
      transparent: 'transparent',
      ...flattenTokens(tokens.kda.foundation.color.background),
    },
    border: {
      none: 'none',
      hairline: tokens.kda.foundation.border.hairline,
      normal: tokens.kda.foundation.border.normal,
      thick: tokens.kda.foundation.border.thick,
    },
    borderColor: flattenTokens(tokens.kda.foundation.color.border),
    borderRadius: tokens.kda.foundation.radius,
    borderWidth: tokens.kda.foundation.border.width,
    bottom: [0],
    boxShadow: tokens.kda.foundation.effect.shadow,
    color: flattenTokens({
      icon: tokens.kda.foundation.color.icon,
      text: tokens.kda.foundation.color.text,
    }),
    cursor: ['pointer', 'not-allowed'],
    flex: [1],
    flexGrow: [0, 1],
    flexShrink: [0],
    flexWrap: ['wrap', 'nowrap'],
    fontFamily: tokens.kda.foundation.typography.family,
    fontWeight: flattenTokens(tokens.kda.foundation.typography.weight),
    height: ['100%'],
    inset: [0],
    left: [0],
    listStyleType: ['none'],
    maxWidth: {
      'content.maxWidth': tokens.kda.foundation.layout.content.maxWidth,
    },
    minWidth: {
      'content.minWidth': tokens.kda.foundation.layout.content.minWidth,
    },
    opacity: [0, 1],
    outline: ['none'],
    overflow: ['hidden', 'visible', 'scroll', 'auto'],
    overflowX: ['hidden', 'visible', 'scroll', 'auto'],
    overflowY: ['hidden', 'visible', 'scroll', 'auto'],
    pointerEvents: ['none'],
    position: ['fixed', 'static', 'absolute', 'relative', 'sticky'],
    right: [0],
    textAlign: ['left', 'center', 'right'],
    textDecoration: ['underline', 'none'],
    textTransform: ['uppercase', 'lowercase', 'capitalize', 'none'],
    top: [0],
    whiteSpace: ['nowrap', 'break-spaces', 'normal', 'pre-wrap'],
    width: ['100%'],
    wordBreak: ['normal', 'keep-all', 'break-word', 'break-all'],
    zIndex: [-1, 0, 1],
  },
});

const responsiveProperties = defineProperties({
  conditions: mapValues(breakpoints, (bp?: string) =>
    bp === '' ? {} : { '@media': bp },
  ),
  defaultCondition: 'xs',
  properties: {
    alignItems: ['flex-start', 'center', 'flex-end', 'stretch'],
    display: [
      'none',
      'flex',
      'block',
      'inline',
      'inline-block',
      'grid',
      'inline-flex',
    ],
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
    fontSize: tokens.kda.foundation.typography.fontSize,
    gap: tokens.kda.foundation.spacing,
    gridGap: tokens.kda.foundation.spacing,
    justifyContent: [
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    lineHeight: tokens.kda.foundation.typography.lineHeight,
    marginBottom: tokens.kda.foundation.spacing,
    marginLeft: { ...tokens.kda.foundation.spacing, auto: 'auto' },
    marginRight: { ...tokens.kda.foundation.spacing, auto: 'auto' },
    marginTop: tokens.kda.foundation.spacing,
    paddingBottom: tokens.kda.foundation.spacing,
    paddingLeft: tokens.kda.foundation.spacing,
    paddingRight: tokens.kda.foundation.spacing,
    paddingTop: tokens.kda.foundation.spacing,
  },
  shorthands: {
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
});

export const atoms = createSprinkles(systemProperties, responsiveProperties);

export type Atoms = Parameters<typeof atoms>[0];

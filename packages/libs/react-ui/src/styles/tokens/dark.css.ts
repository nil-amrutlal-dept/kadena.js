/* This file is generated automatically by Design Sync. Do not edit this file directly. */

import { tokens } from './contract.css';

export const darkThemeValues = {
  kda: {
    foundation: {
      border: {
        width: {
          hairline: '1px',
          normal: '2px',
          thick: '4px',
        },
        hairline: `${tokens.kda.foundation.border.width.hairline} solid ${tokens.kda.foundation.color.border.base.default}`,
        normal: `${tokens.kda.foundation.border.width.normal} solid ${tokens.kda.foundation.color.border.base['@bold']}`,
        thick: `${tokens.kda.foundation.border.width.thick} solid ${tokens.kda.foundation.color.border.base['@bold']}`,
      },
      breakpoint: {
        xs: '0rem',
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        xxl: '96rem',
      },
      radius: {
        no: '0px',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '16px',
        xxl: '24px',
        round: '999rem',
      },
      size: {
        n0: '0px',
        n1: '0.25rem',
        n2: '0.5rem',
        n3: '0.75rem',
        n4: '1rem',
        n5: '1.25rem',
        n6: '1.5rem',
        n7: '1.75rem',
        n8: '2rem',
        n9: '2.25rem',
        n10: '2.5rem',
        n11: '2.75rem',
        n12: '3rem',
        n13: '3.25rem',
        n14: '3.5rem',
        n15: '3.75rem',
        n16: '4rem',
        n17: '4.25rem',
        n18: '4.5rem',
        n19: '4.75rem',
        n20: '5rem',
        n24: '6rem',
        n25: '6.25rem',
        n30: '7.5rem',
        n32: '8rem',
        n35: '8.75rem',
        n40: '10rem',
        n48: '12rem',
        n56: '14rem',
        n64: '16rem',
      },
      spacing: {
        no: tokens.kda.foundation.size.n0,
        xxs: '0.125rem',
        xs: tokens.kda.foundation.size.n1,
        sm: tokens.kda.foundation.size.n2,
        md: tokens.kda.foundation.size.n4,
        lg: tokens.kda.foundation.size.n6,
        xl: tokens.kda.foundation.size.n7,
        xxl: tokens.kda.foundation.size.n9,
        xxxl: tokens.kda.foundation.size.n10,
      },
      color: {
        accent: {
          blue: tokens.kda.foundation.color.palette.blue.n70,
          indigo: tokens.kda.foundation.color.palette.indigo.n70,
          lime: tokens.kda.foundation.color.palette.lime.n70,
          magenta: tokens.kda.foundation.color.palette.magenta.n70,
          purple: tokens.kda.foundation.color.palette.purple.n70,
          red: tokens.kda.foundation.color.palette.red.n70,
          yellow: tokens.kda.foundation.color.palette.yellow.n70,
          brand: {
            primary: tokens.kda.foundation.color.brand.primary.n70,
            secondary: tokens.kda.foundation.color.brand.secondary.n70,
          },
          semantic: {
            info: tokens.kda.foundation.color.semantic.info.n70,
            warning: tokens.kda.foundation.color.semantic.warning.n70,
            positive: tokens.kda.foundation.color.semantic.positive.n70,
            negative: tokens.kda.foundation.color.semantic.negative.n70,
          },
        },
        background: {
          base: {
            default: tokens.kda.foundation.color.neutral.n20,
            '@hover': tokens.kda.foundation.color.neutral.n10,
            '@inverse': tokens.kda.foundation.color.neutral.n80,
          },
          'layer-1': {
            default: tokens.kda.foundation.color.neutral.n10,
            '@hover': tokens.kda.foundation.color.neutral.n20,
            '@inverse': tokens.kda.foundation.color.neutral.n90,
          },
          'layer-2': {
            default: tokens.kda.foundation.color.neutral.n5,
            '@hover': tokens.kda.foundation.color.neutral.n0,
            '@inverse': tokens.kda.foundation.color.neutral.n95,
          },
          'layer-3': {
            default: tokens.kda.foundation.color.neutral.n0,
            '@hover': tokens.kda.foundation.color.neutral.n5,
            '@inverse': tokens.kda.foundation.color.neutral.n100,
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n1,
              '@hover': tokens.kda.foundation.color.brand.primary.n5,
              '@inverse': tokens.kda.foundation.color.brand.primary.n99,
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n1,
              '@hover': tokens.kda.foundation.color.brand.secondary.n5,
              '@inverse': tokens.kda.foundation.color.brand.secondary.n99,
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n1,
              '@hover': tokens.kda.foundation.color.semantic.positive.n10,
              '@inverse': tokens.kda.foundation.color.semantic.positive.n95,
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n1,
              '@hover': tokens.kda.foundation.color.semantic.negative.n10,
              '@inverse': tokens.kda.foundation.color.semantic.negative.n95,
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n1,
              '@hover': tokens.kda.foundation.color.semantic.warning.n10,
              '@inverse': tokens.kda.foundation.color.semantic.warning.n95,
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n1,
              '@hover': tokens.kda.foundation.color.semantic.info.n10,
              '@inverse': tokens.kda.foundation.color.semantic.info.n95,
            },
          },
        },
        border: {
          base: {
            default: tokens.kda.foundation.color.neutral.n10,
            '@bold': tokens.kda.foundation.color.neutral.n20,
            '@boldest': tokens.kda.foundation.color.neutral.n30,
            '@disabled': tokens.kda.foundation.color.neutral.n20,
            '@inverse': tokens.kda.foundation.color.neutral.n100,
            '@hover': tokens.kda.foundation.color.neutral.n20,
            '@focus': tokens.kda.foundation.color.neutral.n60,
          },
          brand: {
            primary: tokens.kda.foundation.color.brand.primary.n0,
            secondary: tokens.kda.foundation.color.brand.secondary.n0,
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n60,
              '@subtle': tokens.kda.foundation.color.semantic.positive.n5,
              '@disabled': tokens.kda.foundation.color.semantic.positive.n20,
              '@inverse': tokens.kda.foundation.color.semantic.positive.n40,
              '@hover': tokens.kda.foundation.color.semantic.positive.n70,
              '@focus': tokens.kda.foundation.color.semantic.positive.n60,
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n60,
              '@subtle': tokens.kda.foundation.color.semantic.negative.n5,
              '@disabled': tokens.kda.foundation.color.semantic.negative.n20,
              '@inverse': tokens.kda.foundation.color.semantic.negative.n40,
              '@hover': tokens.kda.foundation.color.semantic.negative.n70,
              '@focus': tokens.kda.foundation.color.semantic.negative.n60,
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n60,
              '@subtle': tokens.kda.foundation.color.semantic.warning.n5,
              '@disabled': tokens.kda.foundation.color.semantic.warning.n20,
              '@inverse': tokens.kda.foundation.color.semantic.warning.n40,
              '@hover': tokens.kda.foundation.color.semantic.warning.n70,
              '@focus': tokens.kda.foundation.color.semantic.warning.n60,
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n60,
              '@subtle': tokens.kda.foundation.color.semantic.info.n5,
              '@disabled': tokens.kda.foundation.color.semantic.info.n20,
              '@inverse': tokens.kda.foundation.color.semantic.info.n40,
              '@hover': tokens.kda.foundation.color.semantic.info.n70,
              '@focus': tokens.kda.foundation.color.semantic.info.n60,
            },
          },
        },
        brand: {
          primary: {
            n0: tokens.kda.foundation.color.palette.blue.n0,
            n1: tokens.kda.foundation.color.palette.blue.n1,
            n5: tokens.kda.foundation.color.palette.blue.n5,
            n10: tokens.kda.foundation.color.palette.blue.n10,
            n20: tokens.kda.foundation.color.palette.blue.n20,
            n30: tokens.kda.foundation.color.palette.blue.n30,
            n40: tokens.kda.foundation.color.palette.blue.n40,
            n50: tokens.kda.foundation.color.palette.blue.n50,
            n60: tokens.kda.foundation.color.palette.blue.n60,
            n70: tokens.kda.foundation.color.palette.blue.n70,
            n80: tokens.kda.foundation.color.palette.blue.n80,
            n90: tokens.kda.foundation.color.palette.blue.n90,
            n95: tokens.kda.foundation.color.palette.blue.n95,
            n99: tokens.kda.foundation.color.palette.blue.n99,
            n100: tokens.kda.foundation.color.palette.blue.n100,
          },
          secondary: {
            n0: tokens.kda.foundation.color.palette.purple.n0,
            n1: tokens.kda.foundation.color.palette.purple.n1,
            n5: tokens.kda.foundation.color.palette.purple.n5,
            n10: tokens.kda.foundation.color.palette.purple.n10,
            n20: tokens.kda.foundation.color.palette.purple.n20,
            n30: tokens.kda.foundation.color.palette.purple.n30,
            n40: tokens.kda.foundation.color.palette.purple.n40,
            n50: tokens.kda.foundation.color.palette.purple.n50,
            n60: tokens.kda.foundation.color.palette.purple.n60,
            n70: tokens.kda.foundation.color.palette.purple.n70,
            n80: tokens.kda.foundation.color.palette.purple.n80,
            n90: tokens.kda.foundation.color.palette.purple.n90,
            n95: tokens.kda.foundation.color.palette.purple.n95,
            n99: tokens.kda.foundation.color.palette.purple.n99,
            n100: tokens.kda.foundation.color.palette.purple.n100,
          },
        },
        icon: {
          base: {
            default: tokens.kda.foundation.color.neutral.n80,
            '@bold': tokens.kda.foundation.color.neutral.n90,
            '@disabled': tokens.kda.foundation.color.neutral.n60,
            '@inverse': tokens.kda.foundation.color.neutral.n20,
            '@hover': tokens.kda.foundation.color.neutral.n70,
            '@focus': tokens.kda.foundation.color.neutral.n60,
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n40,
              '@bold': tokens.kda.foundation.color.brand.primary.n50,
              '@disabled': tokens.kda.foundation.color.brand.primary.n20,
              '@inverse': tokens.kda.foundation.color.brand.primary.n0,
              '@hover': tokens.kda.foundation.color.brand.primary.n50,
              '@focus': tokens.kda.foundation.color.brand.primary.n60,
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n40,
              '@bold': tokens.kda.foundation.color.brand.secondary.n50,
              '@disabled': tokens.kda.foundation.color.brand.secondary.n20,
              '@inverse': tokens.kda.foundation.color.brand.secondary.n0,
              '@hover': tokens.kda.foundation.color.brand.secondary.n50,
              '@focus': tokens.kda.foundation.color.brand.secondary.n60,
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n80,
              '@inverse': tokens.kda.foundation.color.semantic.positive.n20,
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n80,
              '@inverse': tokens.kda.foundation.color.semantic.negative.n20,
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n80,
              '@inverse': tokens.kda.foundation.color.semantic.warning.n20,
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n80,
              '@inverse': tokens.kda.foundation.color.semantic.info.n20,
            },
          },
        },
        link: {
          base: {
            default: tokens.kda.foundation.color.palette.blue.n70,
            '@hover': tokens.kda.foundation.color.palette.blue.n80,
            '@focus': tokens.kda.foundation.color.palette.blue.n60,
            '@visited': tokens.kda.foundation.color.palette.purple.n80,
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n70,
              '@hover': tokens.kda.foundation.color.brand.primary.n80,
              '@focus': tokens.kda.foundation.color.brand.primary.n60,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n70,
              '@hover': tokens.kda.foundation.color.brand.secondary.n80,
              '@focus': tokens.kda.foundation.color.brand.secondary.n60,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n90,
              '@hover': tokens.kda.foundation.color.semantic.positive.n95,
              '@focus': tokens.kda.foundation.color.semantic.positive.n80,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n90,
              '@hover': tokens.kda.foundation.color.semantic.negative.n95,
              '@focus': tokens.kda.foundation.color.semantic.negative.n80,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n90,
              '@hover': tokens.kda.foundation.color.semantic.warning.n95,
              '@focus': tokens.kda.foundation.color.semantic.warning.n80,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n90,
              '@hover': tokens.kda.foundation.color.semantic.info.n95,
              '@focus': tokens.kda.foundation.color.semantic.info.n80,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
          },
        },
        neutral: {
          n0: '#000000',
          n5: '#0f0f0f',
          n10: '#1a1a1a',
          n20: '#222222',
          n30: '#333333',
          n40: '#464646',
          n50: '#6d6d6d',
          n60: '#909090',
          n70: '#b1b1b1',
          n80: '#d5d5d5',
          n90: '#e6e6e6',
          n95: '#f8f8f8',
          n100: '#ffffff',
        },
        text: {
          base: {
            default: tokens.kda.foundation.color.neutral.n95,
            '@disabled': tokens.kda.foundation.color.neutral.n60,
            '@selected': tokens.kda.foundation.color.palette.blue.n70,
            '@inverse': tokens.kda.foundation.color.neutral.n0,
          },
          gray: {
            default: tokens.kda.foundation.color.neutral.n70,
            '@lighter': tokens.kda.foundation.color.neutral.n60,
            '@bolder': tokens.kda.foundation.color.neutral.n80,
            '@inverse': tokens.kda.foundation.color.neutral.n30,
          },
          subtle: {
            default: tokens.kda.foundation.color.neutral.n70,
            '@hover': tokens.kda.foundation.color.neutral.n80,
            '@inverse': tokens.kda.foundation.color.neutral.n30,
          },
          subtlest: {
            default: tokens.kda.foundation.color.neutral.n60,
            '@hover': tokens.kda.foundation.color.neutral.n50,
            '@inverse': tokens.kda.foundation.color.neutral.n40,
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n95,
              '@inverse': tokens.kda.foundation.color.brand.primary.n5,
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n95,
              '@inverse': tokens.kda.foundation.color.brand.secondary.n5,
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n90,
              '@inverse': tokens.kda.foundation.color.semantic.positive.n10,
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n90,
              '@inverse': tokens.kda.foundation.color.semantic.negative.n10,
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n90,
              '@inverse': tokens.kda.foundation.color.semantic.warning.n10,
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n90,
              '@inverse': tokens.kda.foundation.color.semantic.info.n10,
            },
          },
        },
        palette: {
          blue: {
            n0: '#001329',
            n1: '#002754',
            n5: '#003571',
            n10: '#004491',
            n20: '#0054b6',
            n30: '#0265dc',
            n40: '#147af3',
            n50: '#3892f3',
            n60: '#59a7f6',
            n70: '#78bbfa',
            n80: '#96cefd',
            n90: '#b5deff',
            n95: '#cae8ff',
            n99: '#e0f2ff',
            n100: '#fafcff',
          },
          indigo: {
            n0: '#0b0c28',
            n1: '#1b1e64',
            n5: '#262986',
            n10: '#3236a8',
            n20: '#4046ca',
            n30: '#5258e4',
            n40: '#686df4',
            n50: '#7e84fc',
            n60: '#9599ff',
            n70: '#acafff',
            n80: '#c1c4ff',
            n90: '#d3d5ff',
            n95: '#e0e2ff',
            n99: '#edeeff',
            n100: '#f7f7fd',
          },
          lime: {
            n0: '#0a1f00',
            n1: '#212c00',
            n5: '#2c3b00',
            n10: '#3a4d00',
            n20: '#486000',
            n30: '#577400',
            n40: '#678800',
            n50: '#769c00',
            n60: '#87b103',
            n70: '#98c50a',
            n80: '#aad816',
            n90: '#bce92a',
            n95: '#cbf443',
            n99: '#e6fd9b',
            n100: '#f8fff5',
          },
          magenta: {
            n0: '#230115',
            n1: '#54032a',
            n5: '#700037',
            n10: '#8e0045',
            n20: '#ad0955',
            n30: '#c82269',
            n40: '#de3d82',
            n50: '#ef5a98',
            n60: '#fa77aa',
            n70: '#ff95bd',
            n80: '#ffb2ce',
            n90: '#ffcadd',
            n95: '#ffdce8',
            n99: '#ffeaf1',
            n100: '#fff5fb',
          },
          purple: {
            n0: '#13001f',
            n1: '#33106a',
            n5: '#470c94',
            n10: '#5d13b7',
            n20: '#7326d3',
            n30: '#893de7',
            n40: '#9d57f4',
            n50: '#ae72f9',
            n60: '#bd8bfc',
            n70: '#cca4fd',
            n80: '#dbbbfe',
            n90: '#e6d0ff',
            n95: '#eeddff',
            n99: '#f6ebff',
            n100: '#fdfaff',
          },
          red: {
            n0: '#240003',
            n1: '#590000',
            n5: '#740000',
            n10: '#930000',
            n20: '#b40000',
            n30: '#d31510',
            n40: '#ea3829',
            n50: '#f75c46',
            n60: '#ff7c65',
            n70: '#ff9b88',
            n80: '#ffb7a9',
            n90: '#ffcdc3',
            n95: '#ffddd6',
            n99: '#ffebe7',
            n100: '#fff5f5',
          },
          yellow: {
            n0: '#1f1300',
            n1: '#362500',
            n5: '#483300',
            n10: '#5b4300',
            n20: '#705300',
            n30: '#856600',
            n40: '#9b7800',
            n50: '#b08c00',
            n60: '#c49f00',
            n70: '#d7b300',
            n80: '#e8c600',
            n90: '#f8d904',
            n95: '#f8e750',
            n99: '#fcf4ac',
            n100: '#fffbf5',
          },
        },
        semantic: {
          info: {
            n0: tokens.kda.foundation.color.palette.blue.n0,
            n1: tokens.kda.foundation.color.palette.blue.n1,
            n5: tokens.kda.foundation.color.palette.blue.n5,
            n10: tokens.kda.foundation.color.palette.blue.n10,
            n20: tokens.kda.foundation.color.palette.blue.n20,
            n30: tokens.kda.foundation.color.palette.blue.n30,
            n40: tokens.kda.foundation.color.palette.blue.n40,
            n50: tokens.kda.foundation.color.palette.blue.n50,
            n60: tokens.kda.foundation.color.palette.blue.n60,
            n70: tokens.kda.foundation.color.palette.blue.n70,
            n80: tokens.kda.foundation.color.palette.blue.n80,
            n90: tokens.kda.foundation.color.palette.blue.n90,
            n95: tokens.kda.foundation.color.palette.blue.n95,
            n99: tokens.kda.foundation.color.palette.blue.n99,
            n100: tokens.kda.foundation.color.palette.blue.n100,
          },
          negative: {
            n0: tokens.kda.foundation.color.palette.red.n0,
            n1: tokens.kda.foundation.color.palette.red.n1,
            n5: tokens.kda.foundation.color.palette.red.n5,
            n10: tokens.kda.foundation.color.palette.red.n10,
            n20: tokens.kda.foundation.color.palette.red.n20,
            n30: tokens.kda.foundation.color.palette.red.n30,
            n40: tokens.kda.foundation.color.palette.red.n40,
            n50: tokens.kda.foundation.color.palette.red.n50,
            n60: tokens.kda.foundation.color.palette.red.n60,
            n70: tokens.kda.foundation.color.palette.red.n70,
            n80: tokens.kda.foundation.color.palette.red.n80,
            n90: tokens.kda.foundation.color.palette.red.n90,
            n95: tokens.kda.foundation.color.palette.red.n95,
            n99: tokens.kda.foundation.color.palette.red.n99,
            n100: tokens.kda.foundation.color.palette.red.n100,
          },
          positive: {
            n0: tokens.kda.foundation.color.palette.lime.n0,
            n1: tokens.kda.foundation.color.palette.lime.n1,
            n5: tokens.kda.foundation.color.palette.lime.n5,
            n10: tokens.kda.foundation.color.palette.lime.n10,
            n20: tokens.kda.foundation.color.palette.lime.n20,
            n30: tokens.kda.foundation.color.palette.lime.n30,
            n40: tokens.kda.foundation.color.palette.lime.n40,
            n50: tokens.kda.foundation.color.palette.lime.n50,
            n60: tokens.kda.foundation.color.palette.lime.n60,
            n70: tokens.kda.foundation.color.palette.lime.n70,
            n80: tokens.kda.foundation.color.palette.lime.n80,
            n90: tokens.kda.foundation.color.palette.lime.n90,
            n95: tokens.kda.foundation.color.palette.lime.n95,
            n99: tokens.kda.foundation.color.palette.lime.n99,
            n100: tokens.kda.foundation.color.palette.lime.n100,
          },
          warning: {
            n0: tokens.kda.foundation.color.palette.yellow.n0,
            n1: tokens.kda.foundation.color.palette.yellow.n1,
            n5: tokens.kda.foundation.color.palette.yellow.n5,
            n10: tokens.kda.foundation.color.palette.yellow.n10,
            n20: tokens.kda.foundation.color.palette.yellow.n20,
            n30: tokens.kda.foundation.color.palette.yellow.n30,
            n40: tokens.kda.foundation.color.palette.yellow.n40,
            n50: tokens.kda.foundation.color.palette.yellow.n50,
            n60: tokens.kda.foundation.color.palette.yellow.n60,
            n70: tokens.kda.foundation.color.palette.yellow.n70,
            n80: tokens.kda.foundation.color.palette.yellow.n80,
            n90: tokens.kda.foundation.color.palette.yellow.n90,
            n95: tokens.kda.foundation.color.palette.yellow.n95,
            n99: tokens.kda.foundation.color.palette.yellow.n99,
            n100: tokens.kda.foundation.color.palette.yellow.n100,
          },
        },
        categorical: {
          category1: {
            default: '#2898bd',
            '@hover': '#42b2d7',
          },
          category2: {
            default: '#b8acf6',
            '@hover': '#dfd8fd',
          },
          category3: {
            default: '#e56910',
            '@hover': '#f38a3f',
          },
          category4: {
            default: '#f797d2',
            '@hover': '#fdd0ec',
          },
          category5: {
            default: '#cce0ff',
            '@hover': '#e9f2ff',
          },
          category6: {
            default: '#8270db',
            '@hover': '#8f7ee7',
          },
          category7: {
            default: '#fdd0ec',
            '@hover': '#ffecf8',
          },
          category8: {
            default: '#fec195',
            '@hover': '#fedec8',
          },
        },
      },
      effect: {
        shadow: {
          level1: `4px 0.5rem ${tokens.kda.foundation.size.n2} 4px #000000`,
          level2: `4rem 4rem ${tokens.kda.foundation.size.n2} 2rem #000000`,
          level3: `0px 0px ${tokens.kda.foundation.size.n2} 24px #000000`,
        },
      },
      layout: {
        content: {
          minWidth: '33.75rem',
          maxWidth: '42.5rem',
        },
      },
      icon: {
        size: {
          xxs: tokens.kda.foundation.size.n3,
          xs: tokens.kda.foundation.size.n4,
          sm: tokens.kda.foundation.size.n5,
          base: tokens.kda.foundation.size.n6,
          lg: tokens.kda.foundation.size.n8,
          xl: tokens.kda.foundation.size.n10,
          xxl: tokens.kda.foundation.size.n16,
        },
      },
      typography: {
        family: {
          primaryFont: 'Haas Grot Disp',
          headingFont: 'Haas Grot Disp',
          codeFont: 'Kode Mono',
          bodyFont: 'Haas Grot Disp',
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: tokens.kda.foundation.size.n4,
          md: '1.125rem',
          lg: '1.25rem',
          xl: '1.5rem',
          '2xl': '1.75rem',
          '3xl': '2rem',
          '4xl': '2.25rem',
          '5xl': '2.5rem',
          '6xl': '2.75rem',
          '7xl': '3rem',
          '8xl': '3.25rem',
          '9xl': '3.75rem',
          '10xl': '4.5rem',
          '11xl': '5rem',
          '12xl': '5.25rem',
        },
        lineHeight: {
          base: '1.4',
          lg: '1.9',
        },
        weight: {
          headingFont: {
            regular: '400',
            medium: '500',
            bold: '700',
            black: '700',
          },
          bodyFont: {
            regular: '400',
            medium: '500',
            bold: '600',
            black: '700',
          },
          monoFont: {
            regular: '400',
            medium: '500',
            semiBold: '600',
            bold: '700',
          },
        },
      },
    },
  },
};

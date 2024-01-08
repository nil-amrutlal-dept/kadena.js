import type { IBreadcrumbsProps } from '@components/Breadcrumbs';
import { ProductIcon } from '@components/Icon';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BreadcrumbsContainer } from './Breadcrumbs';
import { BreadcrumbsItem } from './BreadcrumbsItem';

const ItemArray: string[] = [
  'He-man',
  'Skeletor',
  'Orko',
  'Teela-Na',
  'Cringer',
  'King Randor',
];

const meta: Meta<
  {
    itemsCount: number;
    icon: keyof typeof ProductIcon;
  } & IBreadcrumbsProps
> = {
  title: 'Navigation/Breadcrumbs',
  parameters: {
    status: { type: 'needsRevision' },
    docs: {
      description: {
        component:
          'The Breadcrumb component displays the position of the current page within the site hierarchy, allowing page visitors to navigate the page hierarchy from their current location. It is composed by BreadcrumbsContainer and BreadcrumbsItem.<br><br><i>Note: In times when you need to use an external `Link` component (like next/link in Next.js), you can wrap the external component in BreadcrumbsItem and set the `asChild` prop to pass on styles and props to the child component.</i>',
      },
    },
  },
  argTypes: {
    startIcon: {
      description:
        'The base icon for the breadcrumb component displayed to the left of the breadcrumb items. is part of the ProductIcon',
    },
    itemsCount: {
      control: { type: 'range', min: 1, max: 6, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<
  {
    itemsCount: number;
  } & IBreadcrumbsProps
>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  name: 'Breadcrumbs',
  args: {
    // startIcon: 'KadenaOverview',
    startIcon: <ProductIcon.KadenaOverview />,
    itemsCount: 3,
  },
  render: ({ itemsCount, startIcon }) => {
    const items = ItemArray.slice(0, itemsCount);
    return (
      <BreadcrumbsContainer startIcon={startIcon}>
        {items.map((item, idx) => {
          return (
            <BreadcrumbsItem
              key={item}
              href={idx < items.length - 1 ? item : undefined}
            >
              {item}
            </BreadcrumbsItem>
          );
        })}
      </BreadcrumbsContainer>
    );
  },
};

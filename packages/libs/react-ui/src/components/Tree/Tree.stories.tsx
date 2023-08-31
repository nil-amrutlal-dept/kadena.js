import { type ITreeProps, Tree } from './';

import { type Meta, type StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<{} & ITreeProps> = {
  title: 'Components/Tree',
  argTypes: {
    isOpen: {
      description: 'Initial value for list',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    linked: {
      description:
        'by enabling linked feature sibling trees will close their siblings on open',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    title: {
      description: 'root title of the tree',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    items: {
      description: 'JSON object of items',
      defaultValue: {},
      control: {
        type: 'array',
      },
    },
  },
};

export default meta;
type Story = StoryObj<{} & ITreeProps>;

export const Dynamic: Story = {
  name: 'Tree',
  args: {
    title: 'Parent',
    isOpen: true,
    linked: false,
    items: [
      {
        title: 'Child 1',
        items: [{ title: 'Sub Child 1' }, { title: 'Sub Child 2' }],
        isOpen: true,
        onOpen: () => console.log('open child 1'),
        onClose: () => console.log('close child 1'),
      },
      {
        title: 'Child 2',
        items: [{ title: 'Sub Child 1' }, { title: 'Sub Child 2' }],
        isOpen: true,
        onOpen: () => console.log('open child 2'),
        onClose: () => console.log('close child 2'),
      },
      {
        title: 'Child 3',
        items: [{ title: 'Sub Child 1' }, { title: 'Sub Child 2' }],
        isOpen: true,
        onOpen: () => console.log('open child 3'),
        onClose: () => console.log('close child 3'),
      },
    ],
  },
  render: ({ title, isOpen, items, linked }) => {
    return (
      <Tree
        title={title}
        isOpen={Boolean(isOpen)}
        items={items ?? []}
        linked={Boolean(linked)}
      />
    );
  },
};

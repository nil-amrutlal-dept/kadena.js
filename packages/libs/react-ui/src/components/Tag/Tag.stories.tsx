import type { ITagGroupProps } from '@components/Tag';
import { TagGroup, TagItem } from '@components/Tag';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<ITagGroupProps> = {
  title: 'Components/TagGroup',
  component: TagGroup,
  parameters: {
    status: {
      type: ['inDevelopment'],
    },
    docs: {
      description: {
        component:
          'The `TagGroup` component is an implementation of [useTabGroup from react-aria](https://react-spectrum.adobe.com/react-aria/useTagGroup.html). Currently we have enabled options to close or disable tags, but we have disabled features like selection since there has not yet been a need for them.\n\nThe compound component is composed of the exposed `TagGroup` and `TagItem` components, check the examples below to see how to use them.\n\n*Note: In most cases, you should use the `TagGroup` and `TagItem` component composition to ensure that the tags are accessible, however if you need only the tag component styles, you can use the `Tag` component to compose your own custom component.*',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Label for the group. Accepts a string or a ReactNode.',
      control: {
        type: 'text',
      },
    },
    onRemove: {
      description: 'Callback when a tag is removed',
      control: {
        type: null,
      },
    },
    disabledKeys: {
      description: 'Keys of tags that are disabled',
      control: {
        type: null,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ITagGroupProps>;

// eslint-disable-next-line
const tags = [
  { id: '1', name: 'News' },
  { id: '2', name: 'Travel' },
  { id: '3', name: 'Gaming' },
  { id: '4', name: 'Shopping' },
];

export const Group: Story = {
  name: 'Group of tags',
  args: {
    label: undefined,
  },
  render: ({ label }) => {
    return (
      <TagGroup label={label}>
        {tags.map((item) => (
          <TagItem key={item.id}>{item.name}</TagItem>
        ))}
      </TagGroup>
    );
  },
};

export const Removable: Story = {
  name: 'Removable Tags',
  render: () => {
    const [list, setList] = useState(tags);

    return (
      <TagGroup
        label="Filter Categories"
        onRemove={(keys) => {
          setList(list.filter((item) => !keys.has(item.id)));
        }}
      >
        {list.map((item) => (
          <TagItem key={item.id}>{item.name}</TagItem>
        ))}
      </TagGroup>
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled Tag',
  render: () => {
    const [list, setList] = useState(tags);

    return (
      <TagGroup
        label="Filter Categories"
        onRemove={(keys) => {
          setList(list.filter((item) => !keys.has(item.id)));
        }}
        disabledKeys={['2']}
      >
        {list.map((item) => (
          <TagItem key={item.id}>{item.name}</TagItem>
        ))}
      </TagGroup>
    );
  },
};

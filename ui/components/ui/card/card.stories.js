import React from 'react';

import README from './README.mdx';
import Card from '.';

export default {
  title: 'UI/Card',
  id: __filename,
  component: Card,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
  },
};

export const DefaultStory = (args) => <Card {...args}>{args.children}</Card>;

DefaultStory.storyName = 'Default';

DefaultStory.args = {
  children: 'Card children',
  title: 'Card title',
};

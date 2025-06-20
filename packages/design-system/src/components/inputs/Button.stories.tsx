import { Meta, StoryObj } from '@storybook/react';

import Button from 'design-system/components/inputs/Button';
import {
  color,
  disabled,
  loading,
  variant,
} from 'design-system/stories/argsTypes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'inputs/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant,
    color,
    size: {
      control: 'radio',
      defaultValue: 'md',
      options: ['lg', 'md', 'sm'],
    },
    disabled,
    loading,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    variant: 'contained',
    children: 'Button',
  },
};

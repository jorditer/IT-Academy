import type { Meta, StoryObj } from '@storybook/react';
import  Button  from './Button';


const meta = {
  // Metadata that will be shared across every story in the current .stories files
  title: 'Button', // Usually Component/Button to have some kind of herarchy
  args: {
    // style: {borderRadius: '50%'},  // Default style, will be overriden by individual story args
    children: 'Primary',
    variant: 'primary',
    size: 'medium',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      disabled: false, // Can be ommited
    },
  },
  component: Button,
} satisfies Meta; // This is a type assertion, provides type safety to help catch errors during development

export default meta; //
type Story = StoryObj<typeof Button>; // This is a type assertion

// These are called stories, stories for the button component
// Each story represents a specific state or variation of the component
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const Weird: Story = {
  args: {
  variant: 'weird',
  className: 'log',
  children: 'LOGIN',
  }
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    }
  }
}
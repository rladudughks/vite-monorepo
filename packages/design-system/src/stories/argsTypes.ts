import { Args } from '@storybook/react';

export const variant: Args = {
  control: 'radio',
  defaultValue: 'solid',
  options: ['contained', 'outlined', 'text'],
};

export const color: Args = {
  control: 'radio',
  defaultValue: 'primary',
  options: [
    'inherit',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
  ],
};

export const size: Args = {
  control: 'radio',
  defaultValue: 'medium',
  options: ['small', 'medium', 'large'],
};

export const readOnly: Args = {
  control: 'boolean',
  defaultvalue: false,
};

export const disabled: Args = {
  control: 'boolean',
  defaultValue: false,
};

export const loading: Args = {
  control: 'boolean',
  defaultValue: null,
};

export const checked: Args = {
  control: 'boolean',
  defaultValue: false,
};

export const orientation: Args = {
  control: 'radio',
  defaultValue: 'horizontal',
  options: ['horizontal', 'vertical'],
};

export const completed: Args = {
  control: 'boolean',
  defaultValue: false,
};
export const active: Args = { control: 'boolean', defaultValue: false };

export const warning: Args = { control: 'boolean', defaultValue: false };

export const error: Args = {
  control: 'boolean',
  defaultValue: false,
};

export const open: Args = {
  control: 'boolean',
};

export const title: Args = {
  control: 'text',
};

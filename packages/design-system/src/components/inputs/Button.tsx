import MuiButton from '@mui/material/Button';
import type {
  ExtendButton,
  ButtonTypeMap as MuiButtonTypeMap,
} from '@mui/material/Button';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { ElementType, forwardRef, ForwardRefExoticComponent } from 'react';

export type ButtonProps<
  D extends ElementType = MuiButtonTypeMap['defaultComponent'],
  P = { component?: ElementType },
> = OverrideProps<MuiButtonTypeMap<P, D>, D>;

interface ButtonComponent<
  D extends ElementType = MuiButtonTypeMap['defaultComponent'],
> extends ForwardRefExoticComponent<ButtonProps<D>> {
  propTypes?: never;
  muiName?: string;
}

const Button = forwardRef((props, ref) => {
  return <MuiButton {...props} ref={ref} />;
}) as ButtonComponent;

Button.displayName = 'Button';
Button.muiName = 'Button';

export default Button as ExtendButton<MuiButtonTypeMap>;

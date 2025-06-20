import MuiLink from '@mui/material/Link';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { ForwardedRef, forwardRef, useCallback, MouseEvent } from 'react';
import { LinkProps as RouteDomLinkProps } from 'react-router-dom';

export interface LinkProps extends Omit<MuiLinkProps, 'href'> {
  href?: RouteDomLinkProps['to'] & MuiLinkProps['href'];
}

const Link = (props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { href, onClick, ...other } = props;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href) event.preventDefault();

      onClick?.(event);
    },
    [href, onClick],
  );

  return <MuiLink {...other} href={href} onClick={handleClick} ref={ref} />;
};

export default forwardRef<HTMLAnchorElement, LinkProps>(Link);

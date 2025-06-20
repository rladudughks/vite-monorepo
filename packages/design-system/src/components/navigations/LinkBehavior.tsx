import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { ForwardedRef, forwardRef } from 'react';
import {
  Link as RouteDomLink,
  LinkProps as RouteDomLinkProps,
  useInRouterContext,
} from 'react-router-dom';

export interface LinkBehaviorProps extends Omit<MuiLinkProps, 'href'> {
  href?: RouteDomLinkProps['to'] & MuiLinkProps['href'];
}

const LinkBehavior = (
  props: LinkBehaviorProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const isInRouter = useInRouterContext();

  const { href, ...other } = props;

  if (!isInRouter) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} />;
  }

  return (
    <RouteDomLink ref={ref} to={href as RouteDomLinkProps['to']} {...other} />
  );
};

export default forwardRef<HTMLAnchorElement, LinkBehaviorProps>(LinkBehavior);

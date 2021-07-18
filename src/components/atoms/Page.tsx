import { PropsWithChildren } from 'react';
import clsx from 'clsx';

import './Page.scss';

type PageProps = {
  className?: string;
  center?: boolean;
  padding?: boolean;
  column?: boolean;
};

const Page = ({
  children,
  className,
  center,
  padding,
  column,
}: PropsWithChildren<PageProps>) => {
  return (
    <div
      className={clsx(
        'page',
        center && 'center-page',
        padding && 'padding',
        column ? 'column' : 'row',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Page;
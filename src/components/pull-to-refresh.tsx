import React from 'react';

interface IPullToRefresh {
  onRefresh?: () => Promise<any>;
  refreshingContent?: JSX.Element | string;
  pullingContent?: JSX.Element | string;
  children: React.ReactNode;
}

/**
 * PullToRefresh:
 * Wrapper around a third-party PTR component with Soapbox defaults.
 */
const PullToRefresh: React.FC<IPullToRefresh> = ({ children, onRefresh, ...rest }): JSX.Element => {
  return (<>{children}</>);
};

export default PullToRefresh;

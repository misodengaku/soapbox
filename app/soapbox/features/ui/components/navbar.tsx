import classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSettings } from 'soapbox/actions/settings';
import { getSoapboxConfig } from 'soapbox/actions/soapbox';
import Icon from 'soapbox/components/icon';
import { Avatar, Button } from 'soapbox/components/ui';
import Search from 'soapbox/features/compose/components/search';
import { useAppSelector } from 'soapbox/hooks';

import { openSidebar } from '../../../actions/sidebar';

import ProfileDropdown from './profile-dropdown';

const Navbar = () => {
  const dispatch = useDispatch();
  const node = React.useRef(null);

  const me = useAppSelector((state) => state.me);
  const account = useAppSelector((state) => state.accounts.get(me));
  const settings = useAppSelector((state) => getSettings(state));
  const soapboxConfig = useAppSelector((state) => getSoapboxConfig(state));
  const singleUserMode = soapboxConfig.get('singleUserMode');

  // In demo mode, use the Soapbox logo
  const logo = settings.get('demo') ? require('images/soapbox-logo.svg') : soapboxConfig.get('logo');

  const onOpenSidebar = () => dispatch(openSidebar());

  return (
    <nav className='bg-white shadow z-50 sticky top-0' ref={node}>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex justify-between h-12 lg:h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center lg:hidden'>
            <button onClick={onOpenSidebar}>
              <Avatar src={account.avatar} size={34} />
            </button>
          </div>

          <div
            className={classNames({
              'flex-1 flex items-center lg:items-stretch space-x-4': true,
              'justify-center lg:justify-start': account,
              'justify-start': !account,
            })}
          >
            {logo ? (
              <Link key='logo' to='/' data-preview-title-id='column.home' className='flex-shrink-0 flex items-center'>
                <img alt='Logo' src={logo} className='h-5 lg:h-6 w-auto lg:min-w-[160px] cursor-pointer' />
                <span className='hidden'><FormattedMessage id='tabs_bar.home' defaultMessage='Home' /></span>
              </Link>
            ) : (
              <Link key='logo' to='/' data-preview-title-id='column.home' className='flex-shrink-0 flex items-center'>
                <Icon alt='Logo' src={require('icons/home-square.svg')} className='h-5 lg:h-6 w-auto text-primary-700' />
                <span className='hidden'><FormattedMessage id='tabs_bar.home' defaultMessage='Home' /></span>
              </Link>
            )}

            {account && (
              <div className='flex-1 hidden lg:flex justify-center px-2 lg:ml-6 lg:justify-start items-center'>
                <div className='max-w-xl w-full lg:max-w-xs hidden lg:block'>
                  <Search openInRoute autosuggest />
                </div>
              </div>
            )}
          </div>

          <div className='absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0 space-x-3'>
            {account ? (
              <div className='hidden relative lg:flex items-center'>
                <ProfileDropdown account={account}>
                  <Avatar src={account.avatar} size={34} />
                </ProfileDropdown>
              </div>
            ) : (
              <div className='space-x-1.5'>
                <Button theme='secondary' to='/login' size='sm'>
                  <FormattedMessage id='account.login' defaultMessage='Log In' />
                </Button>

                {!singleUserMode && (
                  <Button theme='primary' to='/' size='sm'>
                    <FormattedMessage id='account.register' defaultMessage='Sign up' />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

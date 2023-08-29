import {
  containerClass,
  containerClassDisabled,
  iconClass,
  selectClass,
} from './Select.css';

import { SystemIcon } from '@components/Icon';
import classNames from 'classnames';
import React, { FC, forwardRef } from 'react';

export interface ISelectProps
  extends Omit<
    React.HTMLAttributes<HTMLSelectElement>,
    'aria-label' | 'as' | 'className' | 'children' | 'id'
  > {
  ariaLabel: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: keyof typeof SystemIcon;
  ref?: React.ForwardedRef<HTMLSelectElement>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  id: string;
  value?: string;
}

export const Select: FC<ISelectProps> = forwardRef<
  HTMLSelectElement,
  ISelectProps
>(function Select(
  { ariaLabel, children, disabled = false, icon, ...rest },
  ref,
) {
  const Icon = icon && SystemIcon[icon];

  return (
    <div
      className={classNames(containerClass, {
        [containerClassDisabled]: disabled,
      })}
      data-testid="kda-select"
    >
      {Icon && (
        <span className={iconClass}>
          <Icon size="md" />
        </span>
      )}
      <select
        aria-label={ariaLabel}
        className={selectClass}
        disabled={Boolean(disabled)}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
});

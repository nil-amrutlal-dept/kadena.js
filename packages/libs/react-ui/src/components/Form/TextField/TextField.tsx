import type { IInputProps, IInputWrapperProps } from '@components/Form';
import { Input, InputWrapper } from '@components/Form';
import type { FC } from 'react';
import React from 'react';

export interface ITextFieldProps
  extends Omit<IInputWrapperProps, 'children' | 'htmlFor'> {
  inputProps: Omit<IInputProps, 'disabled' | 'children' | 'leadingTextWidth'>;
}

export const TextField: FC<ITextFieldProps> = ({
  disabled = false,
  inputProps,
  status,
  ...rest
}) => {
  const { id } = inputProps;
  console.log(status);

  return (
    <InputWrapper htmlFor={id} disabled={disabled} status={status} {...rest}>
      <Input disabled={disabled} {...inputProps} />
    </InputWrapper>
  );
};

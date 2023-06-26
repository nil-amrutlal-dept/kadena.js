import { IPollResponse } from '@kadena/chainweb-node-client';
import { ICommandBuilder, IPactCommand, PactCommand } from '@kadena/client';
import {
  Button,
  Heading,
  SystemIcons,
  TextField,
} from '@kadena/react-components';

import MainLayout from '@/components/Common/Layout/MainLayout';
import { Select } from '@/components/Global';
import { StyledOption } from '@/components/Global/Select/styles';
import {
  StyledAccountForm,
  StyledForm,
  StyledFormButton,
} from '@/pages/transfer/cross-chain-transfer-finisher/styles';
import { fundExistingAccount } from '@/services/faucet';
import useTranslation from 'next-translate/useTranslation';
import React, {
  FC,
  FormEvent,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import FormStatusNotification from './notification';

// TODO: This needs to be changed to 100, when the contract is redeployed
const AMOUNT_OF_COINS_FUNDED: number = 21;

// eslint-disable-next-line @kadena-dev/typedef-var
export const CHAINS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
] as const;

export type ChainTuple = typeof CHAINS;
export type Chain = ChainTuple[number];

export type RequestStatus = 'not started' | 'pending' | 'succeeded' | 'failed';

const ExistingFaucetPage: FC = () => {
  const { t } = useTranslation('common');

  const [accountName, setAccountName] = useState('');
  const [chainID, setChainID] = useState<Chain>('0');

  const [requestStatus, setRequestStatus] = useState<{
    status: RequestStatus;
    message?: string;
  }>({ status: 'not started' });

  const onPoll = async (
    transaction: IPactCommand & ICommandBuilder<Record<string, unknown>>,
    pollRequest: Promise<IPollResponse>,
  ): Promise<void> => {
    const request = await pollRequest;
    const result = request[transaction.requestKey!]?.result;
    const status = result?.status;
    if (status === 'failure') {
      const apiErrorMessage = (result.error as { message: string }).message;

      setRequestStatus({ status: 'failed', message: apiErrorMessage });
    }
  };

  const onFormSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Reset form request state
      setRequestStatus({ status: 'pending' });

      try {
        await fundExistingAccount(
          accountName,
          chainID,
          onPoll,
          AMOUNT_OF_COINS_FUNDED,
        );
        setRequestStatus({ status: 'succeeded' });
      } catch (err) {
        let message;
        if (err instanceof Error) {
          message = err.message;
        } else {
          message = String(err);
        }

        /*
         * When the poll callback rejects, it will return `this` (an instance of PactCommand)
         * we handle the `setRequestStatus` in that callback handler, since we get the actual error
         * message there. So in this case we can skip `setRequestStatus`, since we already did that,
         * in other "uncaught" cases we do want to do that.
         */
        if (!(err instanceof PactCommand)) {
          setRequestStatus({ status: 'failed', message });
        }
      }
    },
    [accountName, chainID],
  );

  const onAccountNameChange = useCallback<FormEventHandler<HTMLInputElement>>(
    (e) => {
      setAccountName(e.currentTarget.value);
    },
    [],
  );

  const onChainSelectChange = useCallback<FormEventHandler<HTMLSelectElement>>(
    (e) => {
      setChainID(e.currentTarget.value as Chain);
    },
    [],
  );

  return (
    <MainLayout title={t('Add Funds to Existing Account')}>
      <StyledForm onSubmit={onFormSubmit}>
        <FormStatusNotification
          status={requestStatus.status}
          body={requestStatus.message}
        />
        <StyledAccountForm>
          <Heading as="h3">Account</Heading>
          <TextField
            label={t('The account name you would like to fund coins to')}
            status="error"
            inputProps={{
              onChange: onAccountNameChange,
              leftPanel: SystemIcons.KIcon,
            }}
          />
          <Select
            label={t('Chain ID')}
            onChange={onChainSelectChange}
            value={chainID}
            status="error"
            leftPanel={SystemIcons.Link}
          >
            {CHAINS.map((x) => {
              return <StyledOption key={`chain-${x}`}>{x}</StyledOption>;
            })}
          </Select>
        </StyledAccountForm>
        <StyledFormButton>
          <Button
            title={t('Fund 100 Coins')}
            disabled={requestStatus.status === 'pending'}
          >
            {t('Fund 100 Coins')}
            {requestStatus.status === 'pending' ? (
              <SystemIcons.Loading
                style={{ animation: '2000ms infinite linear spin' }}
              />
            ) : (
              <SystemIcons.TrailingIcon />
            )}
          </Button>
        </StyledFormButton>
      </StyledForm>
    </MainLayout>
  );
};

export default ExistingFaucetPage;

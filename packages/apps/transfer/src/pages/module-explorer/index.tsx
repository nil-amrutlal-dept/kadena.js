import { Button, TextField } from '@kadena/react-components';

import MainLayout from '@/components/Common/Layout/MainLayout';
import { StyledOption, StyledSelect } from '@/components/Global/Select/styles';
import dynamic from 'next/dynamic';

const AceViewer = dynamic(import('@/components/Global/Ace'), {
  ssr: false,
});

import { Select } from '@/components/Global';
import {
  StyledAccountForm,
  StyledCodeViewerContainer,
  StyledForm,
  StyledFormButton,
  StyledMainContent,
  StyledResultContainer,
  StyledSidebar,
  StyledTotalChunk,
  StyledTotalContainer,
} from '@/pages/module-explorer/styles';
import {
  type ModuleResult,
  describeModule,
} from '@/services/modules/describe-module';
import { convertIntToChainId } from '@/services/utils/utils';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useState } from 'react';

const GetCode: FC = () => {
  const { t } = useTranslation('common');
  const [moduleName, setModuleName] = useState<string>('');
  const [moduleChain, setModuleChain] = useState<number>(1);
  const [results, setResults] = useState<ModuleResult>({});

  const networkdId = 'testnet04';
  const numberOfChains = 20;

  const getCode = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    try {
      event.preventDefault();
      const data = await describeModule(
        moduleName,
        convertIntToChainId(moduleChain),
        networkdId,
      );

      setResults(data);
    } catch (e) {
      console.log(e);
    }
  };

  const renderChainOptions = (): JSX.Element[] => {
    const options = [];
    for (let i = 0; i < numberOfChains; i++) {
      options.push(
        <StyledOption value={i} key={i}>
          {i}
        </StyledOption>,
      );
    }
    return options;
  };

  return (
    <MainLayout title={t('Kadena Module Explorer')}>
      <StyledMainContent>
        <StyledSidebar />
        <StyledForm onSubmit={getCode}>
          <StyledAccountForm>
            <Select
              label={t('Select the module chain')}
              leadingText={t('Chain')}
              onChange={(e) => setModuleChain(parseInt(e.target.value))}
              value={moduleChain}
            >
              {renderChainOptions()}
            </Select>
            <TextField
              label={t('Module Name')}
              inputProps={{
                placeholder: t('Enter desired module name'),
                // @ts-ignore
                onChange: (e) => setModuleName(e?.target?.value),
                value: moduleName,
              }}
            />
          </StyledAccountForm>
          <StyledFormButton>
            <Button title={t('Get Code')}>{t('Get Code')}</Button>
          </StyledFormButton>
        </StyledForm>

        {results.status ? (
          <StyledResultContainer>
            <StyledTotalContainer>
              <StyledTotalChunk>
                <p>{t('Request Key')}</p>
                <p>{results.reqKey}</p>
              </StyledTotalChunk>
              <StyledTotalChunk>
                <p>{t('Status')}</p>
                <p>{results.status}</p>
              </StyledTotalChunk>
            </StyledTotalContainer>
          </StyledResultContainer>
        ) : null}

        {results.code ? (
          <StyledResultContainer>
            <StyledCodeViewerContainer>
              <AceViewer code={results.code}></AceViewer>
            </StyledCodeViewerContainer>
          </StyledResultContainer>
        ) : null}
      </StyledMainContent>
    </MainLayout>
  );
};

export default GetCode;

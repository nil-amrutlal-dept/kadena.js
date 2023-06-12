import {
  StyledHomeButton,
  StyledHomeContainer,
  StyledHomeContent,
  StyledHomeContentContainer,
  StyledHomeLink,
  StyledHomeTitle,
  StyledIconBox,
  StyledLinkText,
  StyledSmallLogo,
} from './styles';

import { Account, Chain, Key } from '@/resources/svg/generated';
import { downloadKeyPairToBrowser } from '@/services/key-pairs/key-pairs';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

const Home: FC = () => {
  const { t } = useTranslation('common');

  const transferMenu = [
    {
      icon: Chain,
      title: t('Cross Chain Transfer Tracker'),
      href: '/cross-chain-transfer-tracker',
    },
    {
      icon: Chain,
      title: t('Cross Chain Transfer Finisher'),
      href: '/cross-chain-transfer-finisher',
    },
    {
      icon: Chain,
      title: t('Module explorer'),
      href: '/module-explorer',
    },
  ];

  const faucetMenu = [
    {
      icon: Account,
      title: t('Existing account'),
      href: '/',
    },
    {
      icon: Chain,
      title: t('New account'),
      href: '/',
    },
  ];

  return (
    <StyledHomeContainer>
      <StyledSmallLogo width="65px" />
      <StyledHomeContentContainer>
        <StyledHomeContent>
          <StyledHomeTitle>{t('Cross Chain Transfers')}</StyledHomeTitle>
          {transferMenu.map((item) => (
            <StyledHomeLink key={`item-${item.title}`} href={item.href}>
              <StyledIconBox>
                <item.icon width="40px" height="40px" />
              </StyledIconBox>
              <StyledLinkText>{item.title}</StyledLinkText>
            </StyledHomeLink>
          ))}
        </StyledHomeContent>
        <StyledHomeContent>
          <StyledHomeTitle>{t('Kadena Testnet Faucet')}</StyledHomeTitle>
          {faucetMenu.map((item) => (
            <StyledHomeLink key={`item-${item.title}`} href={item.href}>
              <StyledIconBox>
                <item.icon width="40px" height="40px" />
              </StyledIconBox>
              <StyledLinkText>{item.title}</StyledLinkText>
            </StyledHomeLink>
          ))}
        </StyledHomeContent>
      </StyledHomeContentContainer>
    </StyledHomeContainer>
  );
};

export default Home;

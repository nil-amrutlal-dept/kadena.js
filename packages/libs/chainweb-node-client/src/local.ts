import type { ICommand, IUnsignedCommand, ISignatureJson } from '@kadena/types';
import type {
  ICommandResult,
  LocalRequestBody,
  ILocalCommandResult,
  IPreflightResult,
  LocalResultWithPreflight,
  LocalResultWithoutPreflight,
} from './interfaces/PactAPI';
import { parseResponse, parsePreflight } from './parseResponse';
import { stringifyAndMakePOSTRequest } from './stringifyAndMakePOSTRequest';
import { ensureSignedCommand } from '@kadena/pactjs';

import fetch from 'cross-fetch';

type CmdWithSigs = ICommand;
type CmdOptionalSigs = ICommand | IUnsignedCommand;

/**
 * @alpha
 */
export type IOptions =
  | IOptionsSigVerifyTrue
  | IOptionsSigVerifyFalse
  | IOptionsBothTrue
  | IOptionsBothFalse
  | IOptionsPreflightTrue
  | IOptionsPreflightFalse;

/**
 * @alpha
 */
export interface IOptionsSigVerifyTrue {
  preflight?: boolean;
  signatureVerification: true;
}

/**
 * @alpha
 */
export interface IOptionsSigVerifyFalse {
  preflight?: boolean;
  signatureVerification: false;
}

/**
 * @alpha
 */
export interface IOptionsPreflightTrue {
  preflight: true;
  signatureVerification?: boolean;
}

/**
 * @alpha
 */
export interface IOptionsPreflightFalse {
  preflight: false;
  signatureVerification?: boolean;
}

/**
 * @alpha
 */
export interface IOptionsBothTrue {
  preflight: true;
  signatureVerification: true;
}

/**
 * @alpha
 */
export interface IOptionsBothFalse {
  preflight: false;
  signatureVerification: false;
}

/**
 * @alpha
 */
export function local(
  requestBody: CmdOptionalSigs,
  apiHost: string,
  options?: IOptionsSigVerifyFalse,
): Promise<LocalResultWithPreflight | LocalResultWithoutPreflight>;

/**
 * @alpha
 */
export function local(
  requestBody: CmdWithSigs,
  apiHost: string,
  options?: IOptionsSigVerifyTrue,
): Promise<LocalResultWithPreflight | LocalResultWithoutPreflight>;

/**
 * @alpha
 */
export function local(
  requestBody: CmdWithSigs,
  apiHost: string,
  options?: IOptionsBothTrue,
): Promise<LocalResultWithPreflight>;

/**
 * @alpha
 */
export function local(
  requestBody: CmdOptionalSigs,
  apiHost: string,
  options?: IOptionsBothFalse,
): Promise<LocalResultWithoutPreflight>;

/**
 * @alpha
 */
export function local(
  requestBody: CmdOptionalSigs,
  apiHost: string,
  options?: IOptionsPreflightTrue,
): Promise<LocalResultWithPreflight>;

/**
 * @alpha
 */
export function local(
  requestBody: CmdOptionalSigs,
  apiHost: string,
  options?: IOptionsPreflightFalse,
): Promise<LocalResultWithoutPreflight>;

/**
 * Blocking/sync call to submit a command for non-transactional execution.
 * In a blockchain environment this would be a node-local “dirty read”.
 * Any database writes or changes to the environment are rolled back.
 *
 * @param requestBody - Pact command to submit to server (non-transactional).
 * @param apiHost - API host running a Pact-enabled server.
 * @alpha
 */
export function local(
  requestBody: LocalRequestBody,
  apiHost: string,
  options?: IOptions,
): Promise<LocalResultWithPreflight | LocalResultWithoutPreflight> {
  const { signatureVerification = true, preflight = true } = options ?? {};
  if (signatureVerification) {
    requestBody = convertIUnsignedTransactionToNoSig(requestBody);
  }
  const body = ensureSignedCommand(requestBody);
  return localRaw(body, apiHost, {
    preflight: preflight,
    signatureVerification: signatureVerification,
  }).then((result) => parsePreflight(result));
}

/**
 * Blocking/sync call to submit a command for non-transactional execution.
 * In a blockchain environment this would be a node-local “dirty read”.
 * Any database writes or changes to the environment are rolled back.
 *
 * @param requestBody - Pact command to submit to server (non-transactional).
 * @param apiHost - API host running a Pact-enabled server.
 * @param options - option query to enable preflight and signatureVerification
 * @alpha
 */
export function localRaw(
  requestBody: LocalRequestBody,
  apiHost: string,
  {
    preflight,
    signatureVerification,
  }: { signatureVerification: boolean; preflight: boolean },
): Promise<IPreflightResult | ICommandResult> {
  const request = stringifyAndMakePOSTRequest(requestBody);
  const localUrlWithQueries = new URL(`${apiHost}/api/v1/local`);

  localUrlWithQueries.searchParams.append('preflight', preflight.toString());
  localUrlWithQueries.searchParams.append(
    'signatureVerification',
    signatureVerification.toString(),
  );

  const response: Promise<ILocalCommandResult> = fetch(
    localUrlWithQueries.toString(),
    request,
  ).then((r) => parseResponse<ILocalCommandResult>(r));
  return response;
}

/**
 * @alpha
 */
export function convertIUnsignedTransactionToNoSig(
  transaction: IUnsignedCommand,
): ICommand {
  return {
    ...transaction,
    sigs: transaction.sigs.map(
      (s: ISignatureJson | undefined) => s ?? { sig: '' },
    ),
  };
}

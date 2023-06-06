/* eslint-disable @kadena-dev/no-eslint-disable */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @rushstack/typedef-var */
// In this module, we generate new functions by composing other functions. In order to allow TypeScript to automatically infer the types,
// I had to disable these rules.

import {
  $,
  asString,
  atom,
  block,
  dotedAtom,
  id,
  ids,
  IParser,
  maybe,
  oneOf,
  pointerSnapshot,
  repeat,
  seq,
  skipTheRest,
  skipToken,
  str,
} from './parserUtilities';

// :string :object{schema-one} {kind:string,value:string} | string
const typeRule = seq(
  id(':'),
  oneOf(
    // types with interface/schema
    seq($('kind', atom), id('{'), $('value', oneOf(dotedAtom, atom)), id('}')),
    // primary types
    $(atom),
  ),
);

// (defun|defcap name (a:string,b:object{schema-one},c) @doc "test doc")
const method = <T extends IParser>(
  type: 'defun' | 'defcap',
  bodyParser: T = skipTheRest as T,
) =>
  block(
    id(type),
    $('name', atom),
    maybe($('returnType', typeRule)),
    block(
      maybe(
        repeat(
          $('parameters', seq($('name', atom), $('type', maybe(typeRule)))),
        ),
      ),
    ),
    maybe(id('@doc')),
    maybe($('doc', str)),
    bodyParser,
  );

// \@managed property manager | \@managed
const managed = oneOf(
  seq(id('@managed'), $('property', atom), $('manager', atom)),
  id('@managed', true),
);

// .... (compose-capability CAP)
const capabilityBody = seq(
  maybe($('managed', managed)),
  repeat(
    $('composeCapabilities', seq(id('compose-capability'), id('('), $(atom))),
    skipToken,
  ),
);

const functionBody = seq(
  // add the pointer index to the output in order to refer to that to determine all function calls
  $('bodyPointer', pointerSnapshot),
  repeat(
    $('requiredCapabilities', seq(id('require-capability'), id('('), $(atom))),
    $('withCapabilities', seq(id('with-capability'), id('('), $(atom))),
    $(
      'externalFnCalls',
      seq(
        id('('),
        oneOf(
          // namespace.module.function
          seq(
            $('namespace', atom),
            id('.'),
            $('module', atom),
            id('.'),
            $('func', atom),
          ),
          // module.function
          seq($('module', atom), id('.'), $('func', atom)),
        ),
      ),
    ),
    skipToken,
  ),
);

const schema = block(
  // defschema
  id('defschema'),
  $('name', atom),
  maybe(id('@doc')),
  maybe($('doc', str)),
  repeat($('properties', seq($('name', atom), $('type', typeRule)))),
);

const use = block(
  id('use'),
  seq(
    oneOf(
      // namespace.module
      seq($('namespace', atom), id('.'), $('name', atom)),
      // module
      $('name', atom),
    ),
    $('hash', maybe(str)),
    maybe(seq(id('['), repeat($('imports', atom)), id(']'))),
  ),
);

const implementsRule = block(
  id('implements'),
  oneOf(
    // namespace.interface
    seq($('namespace', atom), id('.'), $('name', atom)),
    // interface
    $('name', atom),
  ),
);

// (module name governance) @doc "doc"
const moduleRule = block(
  // module
  $('kind', id('module') as IParser<string>),
  $('name', atom),
  $('governance', oneOf(atom, str, asString(block()))),
  maybe(id('@doc')),
  maybe($('doc', str)),
  maybe(seq(id('@model'), id('['), repeat(block()), id(']'))),
  repeat(
    $('functions', method('defun', functionBody)),
    $('capabilities', method('defcap', capabilityBody)),
    $('usedModules', use),
    $('usedInterface', implementsRule),
    $('schemas', schema),
    // skip other type of blocks
    block(),
  ),
);

const interfaceRule = block(
  // module
  $('kind', id('interface') as IParser<string>),
  $('name', atom),
  maybe(id('@doc')),
  maybe($('doc', str)),
  maybe(seq(id('@model'), id('['), repeat(block()), id(']'))),
  repeat(
    $('functions', method('defun', functionBody)),
    $('capabilities', method('defcap', capabilityBody)),
    $('usedModules', use),
    $('usedInterface', implementsRule),
    $('schemas', schema),
    // skip other type of blocks
    block(),
  ),
);

const addLocation = $('location', pointerSnapshot);

export const parser = repeat(
  $('namespaces', block(addLocation, id('namespace'), $('name', str))),
  $('usedModules', seq(addLocation, use)),
  $('modules', seq(addLocation, $('module', oneOf(moduleRule, interfaceRule)))),
);

// use this function to get the list of all function calls inside a function
// we need to do this after parsing the whole file and dependencies and get the list of all functions
export const functionCalls = (
  internals: string[],
  externals: Array<{ namespace?: string; module: string; func: string }>,
) =>
  repeat(
    $('internal', seq(id('('), $(ids(internals)))),
    $(
      'external',
      seq(
        id('('),
        $(
          ids(
            externals.map(({ func }) => func),
            (idx) => externals[idx],
          ),
        ),
      ),
    ),
    skipToken,
  );

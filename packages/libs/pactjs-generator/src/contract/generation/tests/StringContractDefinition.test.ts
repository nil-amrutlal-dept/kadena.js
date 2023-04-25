import { StringContractDefinition } from '../StringContractDefinition';

describe('StringContractDefinition', () => {
  describe('namespace', () => {
    it('gets set when provided as an argument', () => {
      const contractDefinition = new StringContractDefinition(
        'module foo',
        'bar',
      );

      expect(contractDefinition.getNamespace('foo')).toBe('bar');
    });

    it('gets set to the one defined in the contract when NOT provided as an argument', () => {
      const contractDefinition = new StringContractDefinition(
        "(namespace 'free) module foo",
      );

      expect(contractDefinition.getNamespace('foo')).toBe('free');
    });

    it('does NOT get set when NOT defined in the contract and NOT provided as an argument', () => {
      const contractDefinition = new StringContractDefinition('module foo');

      expect(contractDefinition.getNamespace('foo')).toBe('');
    });
  });

  it('returns the defcaps of the contract', () => {
    const contractDefinition = new StringContractDefinition(
      "(namespace 'free) module foo (defcap bar:bool () true) (defcap foo:bool () false)",
    );

    expect(contractDefinition.getCapabilities('foo')).toEqual({
      bar: {
        defcap: 'bar',
        args: {},
        col: 38,
        line: 1,
      },
      foo: {
        defcap: 'foo',
        args: {},
        col: 64,
        line: 1,
      },
    });
  });

  it('returns the modules of the contract', () => {
    const contractDefinition = new StringContractDefinition(
      "(namespace 'free) module foo (defcap bar:bool () true) (defcap foo:bool () false)",
    );

    expect(contractDefinition.modules).toEqual(['foo']);
  });

  it('returns the methods of the contract', () => {
    const contractDefinition = new StringContractDefinition(
      "(namespace 'free) module foo (defun bar:bool () true) (defun foo:bool () false)",
    );

    expect(contractDefinition.getMethods('foo')).toEqual({
      bar: {
        args: {},
        col: 37,
        line: 1,
        method: 'bar',
        returnType: 'bool',
      },
      foo: {
        args: {},
        col: 62,
        line: 1,
        method: 'foo',
        returnType: 'bool',
      },
    });
  });

  it('returns the modules with functions of the contract', () => {
    const contractDefinition = new StringContractDefinition(
      "(namespace 'free) module foo (defcap bar:bool () true) (defcap foo:bool () false) (defun bar:bool () true) (defun foo:bool () false)",
    );

    expect(contractDefinition.modulesWithFunctions).toEqual({
      foo: {
        col: 26,
        defcaps: {
          bar: { args: {}, col: 38, defcap: 'bar', line: 1 },
          foo: { args: {}, col: 64, defcap: 'foo', line: 1 },
        },
        defuns: {
          bar: {
            args: {},
            col: 90,
            line: 1,
            method: 'bar',
            returnType: 'bool',
          },
          foo: {
            args: {},
            col: 115,
            line: 1,
            method: 'foo',
            returnType: 'bool',
          },
        },
        line: 1,
        name: 'foo',
        namespace: 'free',
      },
    });
  });
});

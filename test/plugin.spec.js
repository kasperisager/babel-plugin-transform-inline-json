import test from 'ava';
import {transform} from 'babel-core';
import plugin from '../src/plugin';

test('transforms a JSON import to inline JavaScript', t => {
  const {code} = transform(
    `
    import foo from './fixtures/foo.json'
    `,
    {
      filename: __filename,
      plugins: [
        plugin
      ]
    }
  );

  t.snapshot(code);
});

test('allows whitelisting files that should be inlined', t => {
  const {code} = transform(
    `
    import foo from './fixtures/foo.json'
    import bar from './fixtures/bar.json'
    `,
    {
      filename: __filename,
      plugins: [
        [
          plugin,
          {
            include: 'f*.json'
          }
        ]
      ]
    }
  );

  t.snapshot(code);
});

test('throws an exception when a JSON import cannot be found', t => {
  t.throws(() => transform(
    `
    import bar from './fixtures/bar.json'
    `,
    {
      filename: __filename,
      plugins: [
        plugin
      ]
    }
  ));
});

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

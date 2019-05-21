import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './lib/index.tsx',
  perf: true,
  output: {
    file: 'dist/index.js',
    // format: 'iife',
    format: 'cjs',
    exports: 'named',
    sourcemap: true
  },
  plugins: [
    typescript(),
    resolve({
      extensions: [ '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
    }),
    commonjs()
  ]
}

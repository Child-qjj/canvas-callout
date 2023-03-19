import path from 'node:path'
import { fileURLToPath } from 'node:url'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import type { OutputOptions, RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const terser = async () => {
  return (await import('@rollup/plugin-terser')).default()
}
function createMultipleOutputs(isProduction: boolean): RollupOptions {
  const formats: any[] = ['cjs', 'esm', 'umd','iife']
  const output: OutputOptions[] = formats.map(format => {
    return {
      name:"_canvasSelect",
      dir: 'dist',
      format,
      entryFileNames: `${format}/[name].${format}.js`
    }
  });

  return defineConfig({
    input: path.resolve(__dirname, 'index.ts'),
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        declarationDir:"dist/types"
      }),
      resolve(),
      commonjs(),
      isProduction && terser()
    ],
    output
  })
}
export default (commandLineArgs: any): RollupOptions[] => {
  const isDev = commandLineArgs.watch
  const isProduction = !isDev
  return defineConfig([
    createMultipleOutputs(isProduction)
  ])
}
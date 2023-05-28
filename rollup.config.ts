import path from 'node:path'
import { fileURLToPath } from 'node:url'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import html from '@rollup/plugin-html'
import serve from 'rollup-plugin-serve'
import type { OutputOptions, RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const terser = async () => {
  return (await import('@rollup/plugin-terser')).default()
}
function createMultipleOutputs(isProduction: boolean): RollupOptions {
  const formats: any[] = ['cjs', 'esm', 'umd', 'iife']
  const output: OutputOptions[] = formats.map((format) => {
    return {
      name: '_canvasSelect',
      dir: 'dist',
      format,
      entryFileNames: `[name].${format}.js`
    }
  })

  return defineConfig({
    input: path.resolve(__dirname, 'index.ts'),
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        declarationDir: 'dist/types'
      }),
      resolve(),
      commonjs(),
      json(),
      isProduction && terser(),
      html({
        title: 'Canvas-Callout'
      }),
      serve({
        open: true,
        verbose: true,
        contentBase: ['dist'],
        port: 8000
      })
    ],
    output
  })
}
export default (commandLineArgs: any): RollupOptions[] => {
  const isDev = commandLineArgs.watch
  const isProduction = !isDev
  return defineConfig([createMultipleOutputs(isProduction)])
}

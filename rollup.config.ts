import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { InternalModuleFormat, OutputOptions, RollupOptions } from 'rollup'
import type { RollupHtmlTemplateOptions } from '@rollup/plugin-html'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import html from '@rollup/plugin-html'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { defineConfig } from 'rollup'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const terser = async () => {
  return (await import('@rollup/plugin-terser')).default()
}

const makeHtmlAttributes = (attributes: Record<string, string>) => {
  if (!attributes) {
    return ''
  }
  const keys = Object.keys(attributes)

  return keys.reduce(
    (result, key) => (result += ` ${key}="${attributes[key]}"`),
    ''
  )
}
const defaultTemplate = (options?: RollupHtmlTemplateOptions) => {
  const { attributes, files, meta, publicPath, title } =
    options as RollupHtmlTemplateOptions
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script)
      return `<script src="${publicPath}${fileName}"${attrs}></script>`
    })
    .join('\n')
  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link)
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`
    })
    .join('\n')
  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input)
      return `<meta${attrs}>`
    })
    .join('\n')

  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
<head>
  ${metas}
  <title>${title}</title>
  ${links}
</head>
<body>
  <canvas id="callout"></canvas>
  ${scripts}
</body>
</html>`
}

function createMultipleOutputs(isProduction: boolean): RollupOptions {
  const formats: InternalModuleFormat[] = ['cjs', 'es', 'umd', 'iife']
  const output: OutputOptions[] = formats.map((format) => {
    return {
      file: `dist/${format}/bundle.${format}.js`,
      format
    }
  })

  return defineConfig({
    input: path.resolve(__dirname, '/src/index.ts'),
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
        template: defaultTemplate
      }),
      serve({
        open: true,
        verbose: true,
        contentBase: ['dist/iife'],
        port: 8000
      }),
      livereload({})
    ],
    output
  })
}
export default (commandLineArgs: any): RollupOptions[] => {
  const isDev = commandLineArgs.watch
  const isProduction = !isDev
  return defineConfig([createMultipleOutputs(isProduction)])
}

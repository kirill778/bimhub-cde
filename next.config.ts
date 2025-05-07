// next.config.ts
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfiguration } from 'webpack'; // Импортируем тип для конфигурации Webpack

const nextConfig: NextConfig = {
  reactStrictMode: true,
 // devIndicators: false, // Добавляем опцию devIndicators

  webpack(config: WebpackConfiguration, { isServer, defaultLoaders }) {
    // Добавляем правило для SVG
    config.module = config.module || {}; // Убедимся, что module определен
    config.module.rules = config.module.rules || []; // Убедимся, что rules определен

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, // Применяем только для импортов из JS/TS(X) файлов
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // Опции для SVGR, если нужны, например:
            // icon: true, // Если хотите, чтобы SVG вели себя больше как иконки (напр. 1em x 1em)
            // svgoConfig: { plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }] }
          },
        },
      ],
    });

    // Если вы используете Next.js 12+ и хотите, чтобы file-loader (или asset modules в Webpack 5)
    // по-прежнему обрабатывал SVG для других случаев (например, импорт в CSS или прямой URL),
    // вам может потребоваться настроить это более тонко, чтобы избежать конфликтов.
    // Обычно `issuer` достаточно.

    return config;
  },
};

export default nextConfig;
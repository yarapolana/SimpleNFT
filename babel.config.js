module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.tsx', '.ts'],
        alias: {
          'src/abis': './src/abis',
          'src/assets': './src/assets',
          'src/contexts': './src/contexts',
          'src/contracts': './src/contracts',
          'src/constants': './src/constants',
          'src/components': './src/components',
          'src/lib': './src/lib',
          'src/shared': './src/shared',
          'src/services': './src/services',
          'src/styles': './src/styles',
          'src/store': './src/store',
          'src/utils': './src/utils',
        },
      },
    ],
    // 'inline-react-svg'
  ],
};

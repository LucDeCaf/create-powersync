import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        './src/index',
        {
            builder: 'copy',
            input: './src/templates',
            outDir: './dist/templates',
            pattern: ['**', '!**/node_modules'],
        },
    ],
    declaration: false,
});

import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        './src/index',
        {
            builder: 'mkdist',
            input: './src/templates',
            outDir: './dist/templates',
        },
    ],
    declaration: false,
});

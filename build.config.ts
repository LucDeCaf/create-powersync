import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        'index',
        {
            builder: 'mkdist',
            input: './templates',
            outDir: './dist/templates',
        },
    ],
    declaration: false,
});

import fs from 'node:fs';
import path from 'node:path';
import prompts, { PromptObject } from 'prompts';
import kleur from 'kleur';

const TEMPLATES = [
    {
        title: `${kleur.blue('Vite')} + ${kleur.green('Supabase')}`,
        value: 'vite-supabase-ts',
    },
];

function copyDir(src: string, dest: string, exclude: string[] | null) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    } else if (fs.readdirSync(dest).length > 0) {
        throw new Error('Directory not empty');
    }

    for (const file of fs.readdirSync(src, { withFileTypes: true })) {
        if (exclude?.includes(file.name)) continue;

        const srcPath = path.join(src, file.name);
        const destPath = path.join(dest, file.name);

        if (file.isDirectory()) {
            copyDir(srcPath, destPath, exclude);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

async function main() {
    const questions: PromptObject[] = [
        {
            type: 'select',
            name: 'template',
            message: 'Select a template:',
            choices: TEMPLATES,
        },
        {
            type: 'text',
            name: 'packageName',
            message: 'Package name:',
        },
    ];

    let results: prompts.Answers<'template' | 'packageName'>;

    try {
        results = await prompts(questions, {
            onCancel: (e) => {
                throw new Error('Operation cancelled');
            },
        });
    } catch (e) {
        console.log(e.message);
        return;
    }

    const { template, packageName } = results;

    console.log('Setting up project...');

    copyDir(path.join(import.meta.dirname, 'templates', template), template, [
        'package.json',
        'node_modules',
    ]);

    console.log('Done.');
}

main().catch((e) => console.error(e));

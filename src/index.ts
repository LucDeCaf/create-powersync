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

function copyDir(src: string, dest: string) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    } else if (fs.readdirSync(dest).length > 0) {
        throw new Error('Directory not empty');
    }

    for (const file of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, file.name);
        const destPath = path.join(dest, file.name);

        if (file.isDirectory()) {
            copyDir(srcPath, destPath);
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
    ];

    const { template } = await prompts(questions);

    console.log('Setting up project...');

    copyDir(path.join(import.meta.dirname, 'templates', template), template);

    console.log('Done.');
}

main().catch((e) => console.error(e));

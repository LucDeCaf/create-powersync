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
    const files = fs.readdirSync(src, { withFileTypes: true });

    for (const file of files) {
        const srcPath = path.join(src, file.name);
        const destPath = path.join(dest, file.name);

        if (file.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }

    return true;
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

    if (fs.existsSync(template)) {
        if (fs.readdirSync(template).length > 0) {
            throw new Error('Target directory not empty.');
        }
    } else {
        fs.mkdirSync(template, { recursive: true });
    }

    console.log('Setting up project...');

    copyDir(path.join(import.meta.dirname, 'templates'), template);

    console.log('Done.');
}

main().catch((e) => console.error(e));

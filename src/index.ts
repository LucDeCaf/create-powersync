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

function copyDir(src: string, dest: string): boolean {
    if (fs.existsSync(dest)) {
        return false;
    }

    fs.mkdirSync(dest, { recursive: true });

    const files = fs.readdirSync(src, { withFileTypes: true });

    for (const file of files) {
        const srcPath = path.join(src, file.name);
        const destPath = path.join(dest, file.name);

        if (file.isDirectory()) {
            if (!copyDir(srcPath, destPath)) {
                return false;
            }
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

    console.log('Setting up project...');

    if (!copyDir(path.join(import.meta.dirname, 'templates'), template)) {
        throw new Error('Failed to write files.');
    }

    console.log('Done.');
}

main().catch((e) => console.error(e));

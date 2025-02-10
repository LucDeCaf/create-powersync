#!/usr/bin/env node

import { cpSync } from 'node:fs';
import prompts from 'prompts';
import kleur from 'kleur';

const TEMPLATES = [
    {
        title: `${kleur.blue('Vite')} + ${kleur.green('Supabase')}`,
        value: 'vite-supabase-ts',
    },
];

async function main() {
    const questions = [
        {
            type: 'select',
            name: 'template',
            message: 'Select a template:',
            choices: TEMPLATES,
        },
    ];

    const { template } = await prompts(questions);

    console.log('Setting up project...');

    cpSync('templates/' + template, template, { recursive: true });

    console.log('Done.');
}

main().catch((e) => console.error(e));

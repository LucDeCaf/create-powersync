#!/usr/bin/env node

const fs = require('node:fs');
const prompts = require('prompts');
const {
    black,
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    white,
    gray,
    grey,
} = require('kleur');

const COLORS = {
    black,
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    white,
    gray,
    grey,
};

const TEMPLATES = [
    {
        title: `${COLORS.blue('Vite')} + ${COLORS.green('Supabase')}`,
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
    fs.cpSync('templates/' + template, template, { recursive: true });
}

main().catch((e) => console.error(e));

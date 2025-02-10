// ? Replace this file with your AppSchema.ts

import { Schema } from '@powersync/web';

export const AppSchema = new Schema({});

export type Database = (typeof AppSchema)['types'];

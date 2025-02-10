import { PowerSyncDatabase } from '@powersync/web';
import { AppSchema } from './AppSchema';
import { SupabaseConnector } from './connector';

export const powersync = new PowerSyncDatabase({
    schema: AppSchema,
    database: {
        dbFilename: 'index.db',
        debugMode: process.env.NODE_ENV !== 'production',
    },
});

export const openConnection = async () => {
    if (powersync.connected) {
        await powersync.disconnect();
    }
    await powersync.connect(new SupabaseConnector());
};

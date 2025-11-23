import Dexie, { type EntityTable } from 'dexie';
import type { Collection, CollectionField, CollectionRecord } from './models';

const DB = new Dexie('__lerp_db') as Dexie & {
	collections: EntityTable<Collection, 'id'>;
	fields: EntityTable<CollectionField, 'id'>;
	records: EntityTable<CollectionRecord, 'id'>;
};

DB.version(1).stores({
	collections: 'id, name, slug, type',
	fields: 'id, collectionId, name, slug, order, createdAt, deletedAt',
	records: 'id, collectionId, fieldId, order, createdAt, deletedAt',
});

export { DB };

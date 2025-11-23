import { DB } from './db';
import type { Collection, CollectionField, CollectionRecord } from './models';

export const getCollections = (callback: (results: Collection[]) => void) => {
	DB.collections
		.toArray()
		.then((collections) => callback(collections))
		.catch(() => callback([]));
};

export const getCollectionById = (
	id: string | null,
	callback: (result: Collection | null) => void,
) => {
	DB.collections
		.get(id || '')
		.then((collection) => callback(collection || null))
		.catch(() => callback(null));
};

export const getCollectionBySlug = (
	slug: string | null,
	callback: (result: Collection | null) => void,
) => {
	DB.collections
		.where('slug')
		.equals(slug || '')
		.first()
		.then((collection) => callback(collection || null))
		.catch(() => callback(null));
};

export const getFieldsByCollectionId = (
	id: string | null,
	callback: (results: CollectionField[]) => void,
) => {
	DB.fields
		.where('collectionId')
		.equals(id || '')
		.toArray()
		.then((fields) => callback(fields))
		.catch(() => callback([]));
};

export const getRecordsByCollectionId = (
	id: string | null,
	callback: (results: CollectionRecord[]) => void,
) => {
	DB.records
		.where('collectionId')
		.equals(id || '')
		.toArray()
		.then((records) => callback(records))
		.catch(() => callback([]));
};

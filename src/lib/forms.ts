import { DB } from './db';
import type { Collection, CollectionField } from './models';

export const createCollection = (data: Collection, callback?: () => void) => {
	DB.collections.add(data).finally(() => {
		if (callback) {
			callback();
		}
	});
};

export const updateCollection = (data: Collection, callback?: () => void) => {
	DB.collections.update(data.id, data).finally(() => {
		if (callback) {
			callback();
		}
	});
};

export const deleteCollection = (id: string, callback?: () => void) => {
	DB.collections.delete(id).finally(() => {
		if (callback) {
			callback();
		}
	});
};

export const createFields = (data: CollectionField[], callback?: () => void) => {
	DB.fields.bulkAdd(data).finally(() => {
		if (callback) {
			callback();
		}
	});
};

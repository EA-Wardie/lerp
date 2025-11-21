import Dexie, { type EntityTable } from 'dexie';

export const enum CollectionType {
	Base = 'base',
	Single = 'single',
	View = 'view',
}

export const enum FieldType {
	Text = 'text',
	Number = 'number',
	Bool = 'bool',
	Date = 'date',
	Email = 'email',
	Url = 'url',
	Select = 'select',
	MultiSelect = 'multi_select',
	File = 'file',
	Files = 'files',
	Json = 'json',
	RichText = 'rich_text',
	Relation = 'relation',
}

type Collection = {
	id: string;
	name: string;
	type: CollectionType;
	createdAt: number;
	deletedAt: number | null;
};

type CollectionField = {
	id: string;
	collectionId: string;
	name: string;
	type: FieldType;
	order: number;
	required: boolean;
	createdAt: number;
	deletedAt: number | null;
};

type CollectionRecord = {
	id: string;
	collectionId: string;
	fieldId: string;
	order: number;
	scalars: Record<string, string | number | bigint | boolean | null>;
	data: Record<string, any>;
	createdAt: number;
	deletedAt: number | null;
};

const DB = new Dexie('__lf_erp_db') as Dexie & {
	collections: EntityTable<Collection, 'id'>;
	fields: EntityTable<CollectionField, 'id'>;
	records: EntityTable<CollectionRecord, 'id'>;
};

DB.version(1).stores({
	collections: 'id, name, type',
	fields: 'id, collectionId, name, order, createdAt, deletedAt',
	records: 'id, collectionId, fieldId, order, createdAt, deletedAt',
});

export { DB };

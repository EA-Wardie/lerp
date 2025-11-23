import type { CollectionStatus, CollectionType, FieldType } from './enums';

export type Collection = {
	id: string;
	name: string;
	slug: string;
	status: CollectionStatus;
	type: CollectionType;
	createdAt: number;
	deletedAt: number | null;
};

export type CollectionField = {
	id: string;
	collectionId: string;
	name: string;
	slug: string;
	type: FieldType;
	order: number;
	required: boolean;
	createdAt: number;
	deletedAt: number | null;
};

export type CollectionRecord = {
	id: string;
	collectionId: string;
	fieldId: string;
	order: number;
	scalars: Record<string, string | number | bigint | boolean | null>;
	data: Record<string, any>;
	createdAt: number;
	deletedAt: number | null;
};

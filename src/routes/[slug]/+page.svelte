<script lang="ts">
	import { page } from '$app/state';
	import type { Collection, CollectionField, CollectionRecord } from '$lib';
	import {
		getCollectionBySlug,
		getFieldsByCollectionId,
		getRecordsByCollectionId,
	} from '$lib/queries';

	let slug: string | null = page.params.slug || null;
	let collection: Collection | null = $state(null);
	let fields: CollectionField[] = $state([]);
	let records: CollectionRecord[] = $state([]);

	getCollectionBySlug(slug, (result) => {
		collection = result;

		if (collection) {
			getFieldsByCollectionId(collection.id, (results) => {
				fields = results;
			});

			getRecordsByCollectionId(collection.id, (results) => {
				records = results;
			});
		}
	});
</script>

<div class="overflow-x-auto">
	<table class="table border-b border-base-200 table-xs">
		<thead>
			<tr>
				<th class="py-1.5">ID</th>
				{#each fields as field}
					<th class="py-1.5">{field.name}</th>
				{/each}
				<th class="py-1.5"></th>
				<th class="py-1.5"></th>
			</tr>
		</thead>
		<tbody>
			{#if records.length}
				{#each records as record}
					<tr>
						<th>1</th>
						<td>Cy Ganderton</td>
						<td>Cy Ganderton</td>
						<td class="w-px pr-1">
							<button class="btn btn-xs btn-primary">Edit</button>
						</td>
						<td class="w-px pl-1">
							<button class="btn btn-xs btn-error">Delete</button>
						</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td class="p-2 text-center" colspan={fields.length + 2}>
						<p>No records yet.</p>
						<p>Records you create will apear here.</p>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

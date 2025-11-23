<script lang="ts">
	import { page } from '$app/state';
	import type { Collection, CollectionField } from '$lib';
	import { getCollectionBySlug, getFieldsByCollectionId } from '$lib/queries';

	let slug: string | null = page.params.slug || null;
	let collection: Collection | null = $state(null);
	let fields: CollectionField[] = $state([]);

	getCollectionBySlug(slug, (result) => {
		collection = result;

		if (collection) {
			getFieldsByCollectionId(collection.id, (results) => {
				fields = results;
			});
		}
	});
</script>

<div class="overflow-x-auto">
	<table class="table table-xs">
		<thead>
			<tr>
				<th>ID</th>
				{#each fields as field}
					<th>{field.name}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>1</th>
				<td>Cy Ganderton</td>
				<td>Cy Ganderton</td>
			</tr>
		</tbody>
	</table>
</div>

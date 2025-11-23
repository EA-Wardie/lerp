<script lang="ts">
	import {
		CollectionStatus,
		CollectionType,
		FieldType,
		type Collection,
		type CollectionField,
	} from '$lib';
	import { createCollection, createFields } from '$lib/forms';

	const collectionId = crypto.randomUUID();
	let fields: CollectionField[] = $state([]);

	const addField = () => {
		fields.push({
			id: crypto.randomUUID(),
			collectionId: collectionId,
			name: '',
			slug: '',
			type: FieldType.Text,
			order: fields.length,
			required: false,
			createdAt: Date.now(),
			deletedAt: null,
		});
	};

	const submit = (event: SubmitEvent) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const slug = name.split(' ').join('-').toLowerCase();
		const type = formData.get('type') as CollectionType;
		const status = formData.get('status') as CollectionStatus;

		const collection: Collection = {
			id: collectionId,
			name,
			slug,
			type,
			status,
			createdAt: Date.now(),
			deletedAt: null,
		};

		createCollection(collection, () => {
			createFields(
				fields.map((field: CollectionField) => ({
					...field,
					slug: field.name.split(' ').join('-').toLowerCase(),
				})),
			);
		});
	};
</script>

<div class="drawer drawer-end">
	<input id="collection-create" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<label for="collection-create" class="drawer-button btn w-full btn-primary">
			New Collection
		</label>
	</div>
	<div class="drawer-side">
		<label for="collection-create" aria-label="close sidebar" class="drawer-overlay"></label>
		<section class="flex min-h-full w-1/2 flex-col border-l border-base-200 bg-base-100">
			<div class="shrink border-b border-base-200 py-2 text-center">
				<h1 class="text-xl">New Collection</h1>
			</div>
			<form class="grid grid-cols-2 items-end gap-4 overflow-y-auto p-4" onsubmit={submit}>
				<label class="input col-span-2 w-full">
					<span class="label">Name</span>
					<input required name="name" type="text" placeholder="Enter a name" />
				</label>
				<label class="select w-full">
					<span class="label">Type</span>
					<select required name="type">
						{#each Object.keys(CollectionType) as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
				</label>
				<label class="select w-full">
					<span class="label">Status</span>
					<select required name="status" placeholder="Select a status">
						{#each Object.keys(CollectionStatus) as status}
							<option value={status}>{status}</option>
						{/each}
					</select>
				</label>
				<fieldset
					class="col-span-full fieldset grid grid-cols-3 gap-4 rounded-box border border-base-200 p-4"
				>
					{#if fields.length}
						{#each fields as field}
							<label class="input w-full">
								<span class="label">Name</span>
								<input
									required
									name="name"
									type="text"
									placeholder="Enter a name"
									bind:value={field.name}
								/>
							</label>
							<label class="select w-full">
								<span class="label">Type</span>
								<select required name="type" bind:value={field.type}>
									{#each Object.keys(FieldType) as type}
										<option value={type}>{type}</option>
									{/each}
								</select>
							</label>
							<label class="select w-full">
								<span class="label">Required</span>
								<select required name="required" bind:value={field.required}>
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
							</label>
						{/each}
					{:else}
						<div class="text-base-400 col-span-full text-center">
							<p>No fields yet.</p>
							<p>Start by adding a field below.</p>
						</div>
					{/if}
					<button class="btn col-span-full btn-sm" type="button" onclick={() => addField()}>
						Add Field
					</button>
				</fieldset>
				<div class="col-start-2 grid w-full grid-cols-2 gap-4">
					<button class="btn btn-error" type="button">Cancel</button>
					<button class="btn btn-primary">Create</button>
				</div>
			</form>
		</section>
	</div>
</div>

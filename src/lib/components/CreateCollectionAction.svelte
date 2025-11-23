<script lang="ts">
	import {
		CollectionStatus,
		CollectionType,
		FieldType,
		type Collection,
		type CollectionField,
	} from '$lib';
	import { createCollection, createFields } from '$lib/forms';
	import { ChevronUp, ChevronDown, Trash2 } from '@lucide/svelte';

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

	const removeField = (index: number) => {
		fields.splice(index, 1);
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
		<label for="collection-create" class="drawer-button btn w-full btn-sm btn-primary">
			New Collection
		</label>
	</div>
	<div class="drawer-side">
		<label for="collection-create" aria-label="close sidebar" class="drawer-overlay"></label>
		<section class="flex min-h-full w-100 flex-col border-l border-base-200 bg-base-100">
			<header
				class="sticky top-0 z-10 shrink border-b border-base-200 bg-base-100 py-2 text-center"
			>
				<h1 class="text-xl">New Collection</h1>
			</header>
			<form class="flex grow flex-col" onsubmit={submit}>
				<div class="flex grow flex-col gap-4 overflow-y-auto p-4">
					<label class="input input-sm w-full">
						<span class="label">Name</span>
						<input required name="name" type="text" placeholder="Enter a name" />
					</label>
					<div class="grid grid-cols-2 gap-4">
						<label class="select w-full select-sm">
							<span class="label">Type</span>
							<select required name="type">
								{#each Object.keys(CollectionType) as type}
									<option value={type}>{type}</option>
								{/each}
							</select>
						</label>
						<label class="select w-full select-sm">
							<span class="label">Status</span>
							<select required name="status" placeholder="Select a status">
								{#each Object.keys(CollectionStatus) as status}
									<option value={status}>{status}</option>
								{/each}
							</select>
						</label>
					</div>
					{#if fields.length}
						{#each fields as field, index}
							<fieldset class="fieldset grid gap-4 border border-base-200 p-4">
								<label class="input input-sm w-full">
									<span class="label">Name</span>
									<input
										required
										name="name"
										type="text"
										placeholder="Enter a name"
										bind:value={field.name}
									/>
								</label>
								<div class="grid grid-cols-2 gap-4">
									<label class="select w-full select-sm">
										<span class="label">Type</span>
										<select required name="type" bind:value={field.type}>
											{#each Object.keys(FieldType) as type}
												<option value={type}>{type}</option>
											{/each}
										</select>
									</label>
									<label class="select w-full select-sm">
										<span class="label">Required</span>
										<select required name="required" bind:value={field.required}>
											<option value={true}>Yes</option>
											<option value={false}>No</option>
										</select>
									</label>
								</div>
								<div class="grid grid-cols-3 gap-4">
									<button class="btn btn-xs" type="button">
										<ChevronUp class="size-4" />
									</button>
									<button class="btn btn-xs" type="button">
										<ChevronDown class="size-4" />
									</button>
									<button
										class="btn btn-xs btn-error"
										type="button"
										onclick={() => removeField(index)}
									>
										<Trash2 class="size-4" />
									</button>
								</div>
							</fieldset>
						{/each}
					{/if}
					<button class="btn col-span-full btn-sm" type="button" onclick={() => addField()}>
						Add Field
					</button>
				</div>
				<footer
					class="sticky bottom-0 grid shrink grid-cols-2 gap-4 border-t border-base-200 bg-base-100 p-4"
				>
					<label for="collection-create" class="drawer-button btn btn-sm btn-error"> Cancel </label>
					<button class="btn btn-sm btn-primary">Create</button>
				</footer>
			</form>
		</section>
	</div>
</div>

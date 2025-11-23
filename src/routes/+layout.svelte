<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { type Collection } from '$lib';
	import { getCollectionBySlug, getCollections } from '$lib/queries';
	import CreateCollectionAction from '$lib/components/CreateCollectionAction.svelte';

	let { children } = $props();
	let collections: Collection[] = $state([]);
	let collection: Collection | null = $state(null);
	let slug: string | null = page.params.slug || null;

	getCollections((results) => {
		collections = results;
	});

	getCollectionBySlug(slug, (result) => {
		collection = result;
	});
</script>

<main class="flex h-full w-full flex-row">
	<nav class="flex h-full w-80 shrink flex-col border-r border-base-200 bg-base-100">
		<div class="border-b border-base-200 py-2 text-center">
			<a class="text-xl" href="/">LERP</a>
		</div>
		{#if collections.length}
			<menu class="menu w-full grow p-0 [&_li>*]:rounded-none">
				{#each collections as item}
					<li class={location.pathname.includes(`/${item.slug}`) ? 'menu-active' : ''}>
						<a href="/{item.slug}">{item.name}</a>
					</li>
				{/each}
			</menu>
		{:else}
			<div class="text-base-400 flex w-full grow flex-col justify-center px-6 text-center">
				<p>No collections yet.</p>
				<p>Start by creating a new collection below.</p>
			</div>
		{/if}

		<CreateCollectionAction />
	</nav>
	<div class="flex grow flex-col">
		{#if collection}
			<header
				class="navbar sticky top-0 min-h-10 w-full shrink border-b border-base-200 bg-base-100 px-3 py-2"
			>
				<h1 class="text-xl">{collection.name}</h1>
			</header>
		{/if}

		<section class="grow">
			{@render children()}
		</section>
	</div>
</main>

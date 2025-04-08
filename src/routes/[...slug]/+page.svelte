<script lang="ts">
	import { formatDate } from '$lib/utils';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="px-10 py-4">
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	@import 'tailwindcss';
	@import 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.5/dist/cosmo/bootstrap.min.css';
</style>

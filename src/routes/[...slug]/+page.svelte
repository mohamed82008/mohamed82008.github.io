<script lang="ts">
	import { formatDate } from '$lib/utils';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	@import 'https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css';
</style>

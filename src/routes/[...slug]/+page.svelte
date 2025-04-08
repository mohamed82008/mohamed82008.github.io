<script lang="ts">
	import { formatDate } from '$lib/utils';
	import '../../app.css';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="mr-20 w-200 py-6 pl-12">
	<hgroup>
		<h1 class="mb-5 text-4xl">{data.meta.title}</h1>
		<p class="mb-5 text-xl">Date: {formatDate(data.meta.date)}</p>
	</hgroup>
	<hr class="mb-5" />
	<div class="myprose">
		<data.content />
	</div>
</article>

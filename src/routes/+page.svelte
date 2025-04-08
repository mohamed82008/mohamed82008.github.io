<head>
	<meta charset="utf-8" />
	<title>Mohamed Tarek's Personal Website</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<header class="site-header">
	<h1 class="mb-5 text-4xl font-bold text-white">Mohamed Tarek, PhD</h1>
	<p class="text-xl/8 text-white">
		Senior Product Engineer @ PumasAI Inc. <br />
		Research Affiliate @ University of Sydney
	</p>
</header>
<main class="m-10 ml-50 grid grid-cols-3 gap-12 pr-60">
	<!-- About -->
	<a href="/about/" class="card">
		<img src="/user-icon.png" alt="user icon" class="card-img" />
		<h2 class="card-head">About</h2>
		<p class="card-desc">Background, education and work.</p>
		<p class="card-button">Learn more</p>
	</a>
	<!-- Research and training -->
	<a href="/publications/" class="card">
		<img src="/publish-publishing-icon.png" alt="research icon" class="card-img" />
		<h2 class="card-head">Research & Teaching</h2>
		<p class="card-desc">Publications and teaching material.</p>
		<p class="card-button">Learn more</p>
	</a>
	<!-- Software -->
	<a href="/software/" class="card">
		<img src="/programmer-icon.png" alt="programmer icon" class="card-img" />
		<h2 class="card-head">Software</h2>
		<p class="card-desc">Open source contributions.</p>
		<p class="card-button">Learn more</p>
	</a>
	<!-- Mentorship -->
	<a href="/mentorship/" class="card">
		<img src="/community-icon.png" alt="community icon" class="card-img w-30" />
		<h2 class="card-head">Mentorship</h2>
		<p class="card-desc">People and projects I mentored.</p>
		<p class="card-button">Learn more</p>
	</a>
	<!-- Blog posts -->
	<a href="/blogposts/" class="card">
		<img src="/text-documents-line-icon.png" alt="documents icon" class="card-img" />
		<h2 class="card-head">Blog posts</h2>
		<p class="card-desc">Blog posts I have written.</p>
		<p class="card-button">Learn more</p>
	</a>
	<!-- Awareness -->
	<a href="/awareness/" class="card">
		<img src="/head-idea-icon.png" alt="awareness icon" class="card-img" />
		<h2 class="card-head">Awareness</h2>
		<p class="card-desc">Raise your awareness.</p>
		<p href="/" class="card-button">Learn more</p>
	</a>
</main>

<style>
	@import 'tailwindcss';

	.card {
		@apply h-50 w-57;
	}

	@utility card-img {
		@apply mb-3 h-20 w-26;
	}

	.card-head {
		@apply mb-2 text-2xl font-bold text-gray-700;
	}

	.card-desc {
		@apply mb-4 text-sm text-gray-700;
	}

	.card-button {
		@apply mr-25 rounded-sm bg-gray-500 px-1 py-1 text-center text-lg font-bold text-white;
	}

	.site-header {
		@apply bg-black bg-[url(/home-page-background.png)] bg-size-[auto_400px] bg-position-[right_bottom_-6rem] bg-no-repeat pt-10 pb-10 pl-70;
	}
</style>

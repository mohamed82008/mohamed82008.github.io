<script lang="ts">
  import { onMount } from "svelte";
  import Fuse from "fuse.js";

  type SearchItem = {
    id: string;
    type: "page" | "heading";
    title: string;
    content: string;
    path?: string;
    parentPage?: string;
  };

  let query = "";
  let results: SearchItem[] = [];
  let fuse: Fuse<SearchItem> | null = null;

  onMount(async () => {
    const res = await fetch("/search-index.json");
    const data: SearchItem[] = await res.json();

    fuse = new Fuse(data, {
      includeScore: true,
      threshold: 0.3,
      distance: 100000,
      keys: [
        { name: "title", weight: 0.5 },
        { name: "content", weight: 0.5 },
      ],
    });
  });

  function updateSearch() {
    if (fuse && query.trim() !== "") {
      results = fuse.search(query).map((r) => r.item);
    } else {
      results = [];
    }
  }
</script>

<div class="relative w-full max-w-xl mx-auto">
  <!-- Input -->
  <input
    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    bind:value={query}
    on:input={updateSearch}
    type="text"
    placeholder="Search..."
  />

  <!-- Results -->
  {#if results.length > 0}
    <ul
      class="ml-0 pl-0 absolute z-50 w-full mt-2 bg-white bg-opacity-95 border border-gray-200 rounded-md shadow-lg backdrop-blur"
    >
      {#each results as item}
        <li>
          <a
            href={item.path}
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 transition-colors duration-150"
          >
            {item.title}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

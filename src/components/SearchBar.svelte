<script lang="ts">
  import { onMount, onDestroy } from "svelte";
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
  let isOpen = false; // Track if the results list is open
  let searchRef: HTMLDivElement; // Reference to the search container

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

    // Add event listener to close the list when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef && !searchRef.contains(event.target as Node)) {
        isOpen = false;
      }
    };

    document.addEventListener("click", handleClickOutside);

    onDestroy(() => {
      document.removeEventListener("click", handleClickOutside);
    });
  });

  function updateSearch() {
    if (fuse && query.trim() !== "") {
      results = fuse.search(query).map((r) => r.item);
      isOpen = results.length > 0; // Show the list if there are results
    } else {
      results = [];
      isOpen = false; // Hide the list when no results
    }
  }
</script>

<div bind:this={searchRef} class="relative w-full max-w-xl mx-auto">
  <!-- Input -->
  <input
    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    bind:value={query}
    on:input={updateSearch}
    type="text"
    placeholder="Search..."
    on:focus={() => (isOpen = results.length > 0)}
  />

  <!-- Results -->
  {#if isOpen}
    <ul
      class="ml-0 pl-0 absolute list-none z-50 w-full mt-2 bg-white bg-opacity-95 border border-gray-200 rounded-md shadow-lg backdrop-blur"
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

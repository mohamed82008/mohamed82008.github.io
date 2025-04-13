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

  // Load the search index and initialize Fuse
  onMount(async () => {
    const res = await fetch("/search-index.json");
    const data: SearchItem[] = await res.json();

    fuse = new Fuse(data, {
      includeScore: true,
      threshold: 0.3, // tighter matches
      distance: 100000,
      keys: [
        {
          name: "title",
          weight: 0.5, // boost title matches
        },
        {
          name: "content",
          weight: 0.5,
        },
      ],
    });
  });

  function updateSearch() {
    if (fuse && query.trim() !== "") {
      results = fuse.search(query).map((r) => r.item);
      console.log(results);
    } else {
      results = [];
    }
  }
</script>

<!-- ✅ Bind input to query and update search on input -->
<input bind:value={query} on:input={updateSearch} placeholder="Search..." />

<!-- Show results -->
<ul>
  {#each results as item}
    <li>
      <a href={item.path}>
        {item.title}
      </a>
    </li>
  {/each}
</ul>

<style>
  input {
    padding: 0.5rem;
    width: 100%;
    max-width: 400px;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    text-decoration: none;
    color: blue;
  }
</style>

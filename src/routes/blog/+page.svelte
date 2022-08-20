<script lang="ts">
  import Banner from '$lib/Banner.svelte'
  import PostPreview from '$lib/PostPreview.svelte'
  import TagList from '$lib/TagList.svelte'
  import { flip } from 'svelte/animate'
  import { scale } from 'svelte/transition'
  import type { BlogTag, Post } from '../../types'
  import { BlogTags } from '../../types'
  import type { PageData } from './$types'

  export let data: PageData

  let activeTag: BlogTag

  $: filteredPosts = data.posts.filter(
    (post) => activeTag === `All` || post.tags.includes(activeTag)
  )

  const tagCounter = Object.fromEntries(BlogTags.map((tag) => [tag, 0]))
  tagCounter.All = data.posts.length

  // count tag occurrences
  for (const post of data.posts) {
    for (const tag of post.tags) {
      tagCounter[tag] += 1
    }
  }

  const tagOccurrences = Object.entries(tagCounter) as [BlogTag, number][]
  const campaignTags = BlogTags.filter((tag) => tag.includes(`Campaign`))

  let postsByCampaign: [string, Post[]][]
  $: postsByCampaign = campaignTags.map((tag) => [
    tag,
    filteredPosts.filter((post) => post.tags.includes(tag)),
  ])
</script>

<Banner title="Blog" cover={data.cover} />
<TagList {tagOccurrences} bind:activeTag />

{#each postsByCampaign as [title, postList]}
  {#if postList.length}
    <h2>{title}</h2>
    <ul>
      {#each postList as post (post.slug)}
        <li animate:flip={{ duration: 200 }} transition:scale style="display: flex;">
          <PostPreview {post} />
        </li>
      {/each}
    </ul>
  {/if}
{/each}

<style>
  h2 {
    text-align: center;
  }
  ul {
    list-style: none;
    max-width: 56em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18em, 1fr));
    grid-gap: 1em;
    margin: auto;
    padding: 2em 1em;
  }
</style>

<script lang="ts" context="module">
  import { fetchPosts, fetchAsset } from '../../utils/queries'

  export async function load(): Promise<LoadOutput> {
    const posts = await fetchPosts()
    const cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`)
    return { props: { posts, cover } }
  }
</script>

<script lang="ts">
  import { flip } from 'svelte/animate'
  import { scale } from 'svelte/transition'
  import PostPreview from '../../components/PostPreview.svelte'
  import TagList from '../../components/TagList.svelte'
  import IntersectionObserver from '../../components/IntersectionObserver.svelte'

  import type { LoadOutput } from '@sveltejs/kit'
  import type { BlogTag, Image, Post } from '../../types'
  import { BlogTags } from '../../types'

  import Banner from '../../components/Banner.svelte'

  export let posts: Post[]
  export let cover: Image

  let activeTag: BlogTag
  let nVisible = 9
  const onIntersect = () => (nVisible += 6)

  $: filteredPosts = posts.filter(
    (post) => activeTag === `All` || post.tags.includes(activeTag)
  )
  $: visiblePosts = filteredPosts.slice(0, nVisible)

  const tagCounter = Object.fromEntries(BlogTags.map((tag) => [tag, 0])) as Record<
    BlogTag,
    number
  >

  tagCounter.All = posts.length

  // count tag occurences
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounter[tag] += 1
    }
  }

  const tagOccurences = Object.entries(tagCounter) as [BlogTag, number][]
  const campaignTags = BlogTags.filter((tag) => tag.includes(`Campaign`))

  let postsByCampaign: [string, Post[]][]
  $: postsByCampaign = campaignTags.map((tag) => [
    tag,
    visiblePosts.filter((post) => post.tags.includes(tag)),
  ])
</script>

<Banner title="Blog" {cover} />
<TagList {tagOccurences} bind:activeTag />

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
<IntersectionObserver on:intersect={onIntersect} top={400} />

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

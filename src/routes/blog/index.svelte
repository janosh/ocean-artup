<script context="module">
  import { fetchPosts, fetchAsset } from '../../utils/queries'

  export async function load() {
    const posts = await fetchPosts()
    const cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`)
    return { props: { posts, cover } }
  }
</script>

<script>
  import { flip } from 'svelte/animate'
  import { scale } from 'svelte/transition'
  import PostPreview from '../../components/PostPreview.svelte'
  import TagList from '../../components/TagList.svelte'
  import IntersectionObserver from '../../components/IntersectionObserver.svelte'
  import BasePage from '../../components/BasePage.svelte'

  export let posts, cover

  let activeTag
  let nVisible = 9
  const onIntersect = () => (nVisible += 6)

  $: filteredPosts = posts.filter(
    (post) => activeTag === `Alle` || post.tags.includes(activeTag)
  )
  $: visiblePosts = filteredPosts.slice(0, nVisible)

  // count tag occurences
  const tags = posts.reduce(
    (obj, post) => {
      post.tags.forEach((tag) => (obj[tag] = obj[tag] ? obj[tag] + 1 : 1))
      return obj
    },
    { Alle: posts.length }
  )

  const campaignTags = Object.keys(tags).filter((t) => t.includes(`Campaign`))
  $: postsByCampaign = campaignTags.map((tag) => [
    tag,
    visiblePosts.filter((post) => post.tags.includes(tag)),
  ])
</script>

<BasePage page={{ cover, title: `Blog` }} />
<TagList {tags} bind:activeTag />

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

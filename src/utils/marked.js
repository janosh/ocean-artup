import marked from 'marked'

const renderer = {
  // responsive markdown images
  image(href, title, text) {
    if (href?.includes(`images.ctfassets.net`) && !href.endsWith(`.svg`)) {
      title = title ? `title="${title}"` : ``

      const srcSet = (params) =>
        [900, 600, 400]
          .map((width) => `${href}?w=${width}&${params} ${width}w`)
          .join(`, `)

      return `
      <picture>
        <source srcset="${srcSet(`q=80&fit=fill&fm=webp`)}" type="image/webp" />
        <source srcset="${srcSet(`q=80&fit=fill`)}" />
        <img src="${href}?w=900&q=80" alt="${text}" ${title} loading="lazy" />
      </picture>`
    }

    return false // delegate to default marked image renderer
  },
  // add prefetching for local markdown links
  link(href, title, text) {
    if (href.startsWith(`/`)) {
      title = title ? `title="${title}"` : ``
      return `<a sveltekit:prefetch href="${href}" ${title}>${text}</a>`
    }
    return false // delegate to default marked link renderer
  },
  // responsive iframes for video embeds
  codespan(code) {
    if (code.startsWith(`youtube:`) || code.startsWith(`vimeo:`)) {
      const [platform, id] = code.split(/:\s?/)
      const embed = {
        youtube: (id) => `https://youtube.com/embed/${id}`,
        vimeo: (id) => `https://player.vimeo.com/video/${id}`,
      }
      // padding-top: 56.25%; corresponds to 16/9 = most common video aspect ratio
      return `
        <div style="padding-top: 56.25%; position: relative;">
          <iframe
            title="${platform} video"
            loading="lazy"
            src="${embed[platform](id)}"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
            allowfullscreen></iframe>
        </div>`
    }
    return false // delegate to default marked codespan renderer
  },
}

marked.use({ renderer })

export default marked
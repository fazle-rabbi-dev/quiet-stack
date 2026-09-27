# Perfectionist Diary - Docs

- due to footer is cached for 1d and using PPR so /serach is displayed as 1-day cache in build output

- using ppr for simplicity and to handle caching easily with modern approaches

- on blog details page:
  - the generateStaticParams is fired first at build time than the component is rendered with the slug passsed as param from the generateStaticParams
  - on dev mode the component is fired first with the real slug from the url

- using `text` index for search

- search page is dynamic
- tag page is cached for 1 day
- home and /page/num are also cacged for 1 hour
- blog details page is cached for 1 hour + SSG
  - (it's also ok to not apply SSG to this page since the data caming from cache directly, so without SSG on every req the page get rendered on server with that cached data)
- dashboard pages are not cached

- on admin crud operations:
  - `updateTag` invalidate the cache

### How does page regeneration happening after updateTag('posts')

The build-time prerender is only the opening snapshot. Here is the exact flow after your edit:

1. Mutation writes through. updatePost updates Mongo, then updateTag("posts") bumps the posts tag version on the server. Every cache entry carrying that tag is discarded at once: latest posts, featured, paginated pages, tags, single-post entries. One tag, whole blog invalidated.

2. You navigate home. router.push("/") asks the server for a fresh RSC payload for /.

3. Cache miss, re-execute. getLatestPosts runs again because its cached entry died with the tag. It queries Mongo, gets the updated row, and that result is cached again under the new tag version.

4. Stream + display. The fresh HTML streams in, so the first navigation already shows the edit. No waiting for the hourly cacheLife to expire.

So cacheLife("hours") sets how long entries may live, but updateTag kills them on demand. Build prerender fills the cache once; tag invalidation is what keeps it correct after every write.

## Issue faced and debugged after deployment

- The blog details page always displayed a spinner on page reload, while my expectation was to display cached data. I debugged the issue and found that the page is rendered on the server on each request, and only the DB result is cached server-side — the HTML page itself is not cached, so it's rendered on demand using that cached data.

> I applied cache to the post fetcher function that's why i was expecting the page to be cached.

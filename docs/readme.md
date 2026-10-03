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

## 🐛 Bugs Experenced with `cacheComponents` and spent few days to resolve !

- after deploy to vercel i noticed that the blog details page even for known slug at build time are being dynamically rendered

  - the blog details page is rendering BlogActions component which is rendering BlogLikeButton and this component importing server action (also marked with 'server only') - this is causing: output HTML contains kind of app shell with parent suspense fallback (route's loading.tsx) plus blog content at same time. So i wrap the blog-actions with suspense.

  - the root layout contains the site-header and header is rendering auth-action-buttons and this button component calling getAuthState --> call the server action to check is admin loggedin or not via cookies check
    - when i turn off this components form header `problem get solved`;

> _👽 I don't know why this is happening while i make the header dynamic and wrap with suspense from root-layout than also the issue persist. Only when i disable that form header the issue is gone_

> **Another Thing:** output html still contains suspense fallback when generating page by connecting to mongodb atlas and if the page content is lengthy !! but for short content length the output doesn't contain fallback.

So, finally on vercel deployed url it's working as expected. (First time i spent a lot of time on debugging in my life ! 🙃)

### few things i noticed

- however the featured and latest posts i cached but, on page reload at `/` the page contains dynamic hole for all-stories and by the time all-stories is rendered the featured and latest posts also get updated which is unexpected 🚨.

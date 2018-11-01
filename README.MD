# VK polls

### Done
- [x] Auth via VK with salted passwords
- [x] Single feed which lazily loads polls on scrolling
- [x] Multi-answer and single-answer polls
- [x] Anonymous and public polls
- [x] Caching of all info needed to show polls (user info, votes, options), caching of last 10 polls
- [x]

### TODO
- [ ] Unit tests for backend
- [ ] Jest tests for react components
- [ ] Cache order of not only last 10 polls in the feed, but arbitrary number of polls
- [ ] Analytics tab (fetch more user info from react api, add controller + react component to show this info,
    cache it in controller, draw pretty charts with chart js)
- [ ] Adaptive css for smaller screens
- [ ] In frontend add 'isLoading' and 'isError' vars to state of Presentational components to correctly show loading states
- [ ] In frontend add error handlers to show when errors occur and don't silence them
- [ ] Create index on create_at column in polls table (used for ordering when constructing poll feed)
- [ ]
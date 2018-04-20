### deploy api
- push: any git push to a repository
  - url: /api/event/push
  - method: post
  - params: github webhook

- release: any time a release is published in a repository
  - url: /api/event/release
  - method: post
  - params: github webhook

# Gus

> A generic user server, based on Nest.js, Express and Node, which manages user auth and accounts for multiple domains at once.

- Created 20240603
- Rich Plastow
- <https://github.com/richplastow/gus>

Primarily intended to be run as an AWS App Runner instance, connected to
a Google Firestore database.

- A single __Gus__ instance can serve multiple unrelated apps
- Handles user authentication and credentials
- Can send emails to confirm sign-up, or to reset passwords
- Provides CRUD for user account/profile data, app-usage statistics, and more
- 'superadmin' access, for managing all apps in once place

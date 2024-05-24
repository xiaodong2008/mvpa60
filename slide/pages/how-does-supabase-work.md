---
layout: two-cols
---

# How does supabase work

Someone may ask, why can we remove the backend server, won't it be less secure?

Let's take a look at the code.

````md magic-move
```js
// database.js
```

```js
// database.js
// createClient: api provided by supabase
export default createClient("service url", "token", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```
````

<style>
.slidev-code-wrapper {
  margin-left: 10px !important;
}
</style>

::right::

<v-click>

````md magic-move
```js
// user.js
import db from "./database";
```

```js
// user.js
import db from "./database";

async function register(email, password) {
  const { data, error } = await db.auth.signUp({
    email,
    password,
  });
  if (error) console.log(error);
}
```
````

</v-click>

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
export default createClient("service url", "local token", {
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

```js
// post.js
import database from "../../database";
import message from "../../message";
```

```js
// post.js
import database from "../../database";
import message from "../../message";

async function createPost(title, content) {}
```

```js
// post.js
import database from "../../database";
import message from "../../message";

async function createPost(title, content) {
  const { error } = await database.from("posts").insert();

  if (error) {
    message.error("Failed to publish post");
    return console.error(error);
  }

  message.success("Post published successfully");
  navigation.goBack();
}
```

```js
// post.js
import database from "../../database";
import message from "../../message";

async function createPost(title, content) {
  const { error } = await database.from("posts").insert({
    data: {
      title,
      description,
    },
    private: isPrivate,
    user_id: session.user.id,
  });

  if (error) {
    message.error("Failed to publish post");
    return console.error(error);
  }

  message.success("Post published successfully");
  navigation.goBack();
}
```
````

</v-click>

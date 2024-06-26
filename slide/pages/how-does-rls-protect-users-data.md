---
level: 2
---

# How does RLS protect user's data

As we just said, every user just like registered a database account, so how can we protect the data from being accessed by other users?

````md magic-move
```sql
create table
  public.post (
  ) tablespace pg_default;
```

```sql
create table
  public.post (
    id bigint generated by default as identity,
    created_at timestamp without time zone not null default now(),
    last_edit timestamp without time zone null default now(),
    post_at timestamp without time zone null default now(),
    data json null,
    private boolean not null default true,
    user_id uuid null default auth.uid(),
    constraint post_pkey primary key (id)
  ) tablespace pg_default;
```

```sql {8,9}
create table
  public.post (
    id bigint generated by default as identity,
    created_at timestamp without time zone not null default now(),
    last_edit timestamp without time zone null default now(),
    post_at timestamp without time zone null default now(),
    data json null,
    private boolean not null default true,
    user_id uuid null default auth.uid(),
    constraint post_pkey primary key (id)
  ) tablespace pg_default;
```

```sql
create table
  public.post (
    id bigint generated by default as identity,
    private boolean not null default true,
    user_id uuid null default auth.uid()
  ) tablespace pg_default;
```

```sql
create table
  public.post (
    id bigint generated by default as identity,
    private boolean not null default true,
    user_id uuid null default auth.uid()
  ) tablespace pg_default;

alter policy "Enable insert for authenticated users only" on "public"."post";
```

```sql
create table
  public.post (
    id bigint generated by default as identity,
    private boolean not null default true,
    user_id uuid null default auth.uid()
  ) tablespace pg_default;

alter policy "Enable insert for authenticated users only" on "public"."post"
  for insert
  to authenticated with check (true);
```

```sql
create table
  public.post (
    id bigint generated by default as identity,
    private boolean not null default true,
    user_id uuid null default auth.uid()
  ) tablespace pg_default;

alter policy "Enable insert for authenticated users only" on "public"."post"
  for insert
  to authenticated with check (true);

alter policy "Enable post operation for users based on user_id"
  for select, update
  using (user_id = auth.uid());
```

```sql
create table
  public.post (
    id bigint generated by default as identity,
    private boolean not null default true,
    user_id uuid null default auth.uid()
  ) tablespace pg_default;

alter policy "Enable insert for authenticated users only" on "public"."post"
  for insert
  to authenticated with check (true);

alter policy "Enable post operation for users based on user_id"
  for select, update
  using (user_id = auth.uid());

alter policy "User can only read other's public post"
  for select
  using (private = false);
```
````

-- ============================================================
-- Proteger la edición del itinerario con una clave del grupo
-- ============================================================
-- Hoy la tabla "itinerario" deja que cualquiera con el link lea,
-- cambie o borre el viaje. Después de correr esto:
--   · cualquiera puede LEER (la página lo necesita para mostrarse)
--   · para GUARDAR hay que saber la clave del grupo
--   · nadie puede borrar
--
-- Cómo usarlo:
--   1. Cambien  CAMBIEN-ESTA-CLAVE  (abajo) por la clave que quieran.
--   2. Supabase → SQL Editor → New query → peguen todo → Run.
--   3. Pásenle la clave a los otros tres. La página la pide una sola vez
--      en cada celular, la primera vez que alguien guarde algo.
--
-- Para cambiar la clave después, corran solo el paso 2 con la nueva.
-- ============================================================

create extension if not exists pgcrypto with schema extensions;

-- 1. Dónde se guarda la clave (cifrada; la página nunca la puede leer)
create table if not exists public.clave_grupo (
  id   int  primary key default 1 check (id = 1),
  hash text not null
);
alter table public.clave_grupo enable row level security;
revoke all on public.clave_grupo from anon, authenticated;

-- 2. La clave del grupo  ←  CAMBIEN ESTO
insert into public.clave_grupo (id, hash)
values (1, extensions.crypt('CAMBIEN-ESTA-CLAVE', extensions.gen_salt('bf')))
on conflict (id) do update set hash = excluded.hash;

-- 3. Cerrar la tabla: quitar las políticas abiertas y dejar solo lectura
alter table public.itinerario enable row level security;
do $$
declare p record;
begin
  for p in select policyname from pg_policies
           where schemaname = 'public' and tablename = 'itinerario'
  loop
    execute format('drop policy %I on public.itinerario', p.policyname);
  end loop;
end $$;

create policy "leer el viaje" on public.itinerario
  for select to anon, authenticated
  using (id in ('rio-2026', 'rio-2026-grupo', '__prueba__'));

revoke insert, update, delete, truncate on public.itinerario from anon, authenticated;
grant select on public.itinerario to anon, authenticated;

-- 4. La única forma de guardar: con la clave
create or replace function public.guardar_viaje(
  p_id text, p_data jsonb, p_sello bigint, p_clave text
) returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if p_id not in ('rio-2026', 'rio-2026-grupo', '__prueba__') then
    raise exception 'id no permitido';
  end if;
  if not exists (select 1 from public.clave_grupo where hash = extensions.crypt(coalesce(p_clave, ''), hash)) then
    raise exception 'clave incorrecta';
  end if;
  insert into public.itinerario (id, data, sello)
  values (p_id, p_data, p_sello)
  on conflict (id) do update set data = excluded.data, sello = excluded.sello;
  return true;
end;
$$;

revoke all on function public.guardar_viaje(text, jsonb, bigint, text) from public;
grant execute on function public.guardar_viaje(text, jsonb, bigint, text) to anon, authenticated;

-- Para que la API vea la función nueva de una vez
notify pgrst, 'reload schema';

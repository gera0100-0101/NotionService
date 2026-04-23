create table notion (
    id uuid primary key default gen_random_uuid(),
    name varchar(255),
    notion_type varchar(255) check (notion_type in ('NOTIFICATION', 'DEADLINE')),
    is_cycled boolean,
    cycle_range varchar(255) check (cycle_range in ('DAILY', 'WEEKLY', 'MONTHLY')),
    week_day_repeat varchar(255),
    time_repeat time
);
create table towns(
	id serial not null primary key,
	towns text not null
);

create table registrations(
	id serial not null primary key,
    locations text not null,
	towns_id int,
	foreign key (towns_id) references towns(id)
);
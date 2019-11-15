create table towns(
	id serial not null primary key,
	locations text not null
);

create table registrations(
	id serial not null primary key,
    descriptions text not null,
	towns_id int not null,
	foreign key (towns_id) references towns(id)
);
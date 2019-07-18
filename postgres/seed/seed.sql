BEGIN TRANSACTION;
insert into users (name, email, entries, joined) values ('Guest', 'guest@gmail.com', 0 , '2019-01-01');
insert into login (hash, email) values ('$2a$10$gWuC.Ru3PHdO.j4P1JboE.cPd4JJhgnzelUBNhVQz3P0N7zQWsNm6', 'guest@gmail.com');
COMMIT;

-- Seed data with fake users for testing
BEGIN TRANSACTION;
insert into users (name, email, entries, joined) values ('a', 'a@a.com', 5, '2018-01-01');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'a@a.com');
COMMIT;

BEGIN TRANSACTION;
insert into users (name, email, entries, joined) values ('b', 'b@b.com', 6, '2018-01-01');
insert into login (hash, email) values ('$2a$10$Zu9jZJpQv0JyOMDlPweYDeMVgcqnbePoa/UdmScXoT20F6XCjfyXa', 'b@b.com');
COMMIT;

BEGIN TRANSACTION;
insert into users (name, email, entries, joined) values ('c', 'c@c.com', 7, '2018-01-01');
insert into login (hash, email) values ('$2a$10$zO9OdASerSNkLD0s1XF7XeN43e9KlgVBfZCXKKqohTjO9VbzubkHa', 'c@c.com');
COMMIT;

-- Create blog table 
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes NUMERIC DEFAULT 0
);

-- insert first blog
insert into blogs (author, url, title) values ('Some Author', 'www.someurl.com', 'some title');

-- insert second blog
insert into blogs (author, url, title) values ('Author Two', 'www.someurl2.com', 'second Title');
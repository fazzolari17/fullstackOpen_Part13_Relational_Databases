-- init.sql

-- Create blog table 
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes NUMERIC DEFAULT 0
);

-- insert first blog
INSERT INTO blogs (author, url, title) VALUES 
  ('Dan Abromov', 'www.DanAbromov.com', 'On let vs const'),
  ('Laurenz Albe', 'www.LaurenzAlbe.com', 'Gaps in sequences in PostgreSQL');

-- insert second blog
-- INSERT INTO blogs (author, url, title) VALUES (
--   'Author Two', 'www.someurl2.com', 'second Title');
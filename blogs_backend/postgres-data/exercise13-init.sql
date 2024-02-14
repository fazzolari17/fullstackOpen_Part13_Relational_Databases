-- -- Create users table 
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  hashed_password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -- Create blog table 
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  year_written INTEGER CHECK (year_written >= 1991 AND year_written <= EXTRACT(YEAR FROM CURRENT_DATE)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  -- user_id INTEGER REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id")
  user_id INTEGER REFERENCES users(id) -- ON DELETE CASCADE, PRIMARY KEY (id)
);

-- insert users 
INSERT INTO users (name, username, hashed_password) VALUES
('root', 'rootUser@gmail.com', '$2a$10$eRbzCIsD8FMricIxEkx/0eETmKWqA/9bhlk2/ihzx4gCkamoffUv.'),
('Linus Torvalds', 'Linus_Torvalds@gmail.com', '$2a$10$ABPdbABWDswvubVIm8xHZ.Xc6xbnEpnxnngK5BqyhGgOg.ycxAQae');

-- insert blogs belonging to the first user
INSERT INTO blogs (author, url, title, user_id, year_written) VALUES 
  ('Dan Abromov', 'www.DanAbromov.com', 'On let vs const', 1, 2000),
  ('Laurenz Albe', 'www.LaurenzAlbe.com', 'Gaps in sequences in PostgreSQL', 1, 2021),
  ('Andrew Hunt', 'www.AndrewHunt.com', 'The Pragmatic Programmer', 1, 2005);

-- insert blogs belonging to the second user
INSERT INTO blogs (author, url, title, user_id, year_written) VALUES 
  ('Dan Abromov_2', 'www.DanAbromov_2.com', 'On let vs const_2', 2, 2000),
  ('Laurenz Albe_2', 'www.LaurenzAlbe_2.com', 'Gaps in sequences in PostgreSQL_2', 2, 2021),
  ('Andrew Hunt_2', 'www.AndrewHunt_2.com', 'The Pragmatic Programmer_2', 2, 2005);
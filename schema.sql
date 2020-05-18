DROP TABLE IF EXISTS comp;

CREATE TABLE comp (
  id SERIAL PRIMARY KEY,
  option1 TEXT,
  option2 TEXT,
  opt1_reasons TEXT,
  opt2_reasons TEXT,
  numberOfVotes INT,
  opt1votes INT,
  opt2votes INT,
  is_deleted INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

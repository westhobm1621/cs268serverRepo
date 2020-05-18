DROP DATABASE IF EXISTS compare;
DROP USER IF EXISTS compare_user@localhost;

CREATE DATABASE compare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER compare_user@localhost IDENTIFIED BY 'whyC@ntV1king3wintheSuperbowl?$';
GRANT ALL PRIVILEGES ON compare.* TO compare_user@localhost;

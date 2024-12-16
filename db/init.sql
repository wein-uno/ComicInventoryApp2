CREATE DATABASE IF NOT EXISTS comic_inventory;
USE comic_inventory;

CREATE TABLE IF NOT EXISTS comics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  number INT,
  grade VARCHAR(10),
  value DECIMAL(10,2),
  image LONGBLOB
);

-- Insert sample data
INSERT INTO comics (title, number, grade, value)
VALUES 
('Amazing Spider-Man', 300, '9.8', 2500.00),
('Batman', 1, '8.0', 15000.00);

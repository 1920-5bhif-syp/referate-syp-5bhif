--liquibase fornatted sql

--changeset me:2
CREATE TABLE employee (
	employee_id INT,
	firstname VARCHAR(50),
	lastname VARCHAR(50)
	);
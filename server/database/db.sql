CREATE DATABASE taskdbproject;

use taskdbproject

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    datetime TIMESTAMP NOT NULL
);


 CREATE TABLE tasks (
    ->     id INT PRIMARY KEY AUTO_INCREMENT,
    ->     title VARCHAR(255) NOT NULL,
    ->     description VARCHAR(255) NOT NULL,
    ->     datetime TIMESTAMP NOT NULL
    -> );
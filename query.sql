
CREATE Table user_artikel(
id VARCHAR PRIMARY KEY,
email VARCHAR NOT NULL,
password VARCHAR NOT NULL,
fullName VARCHAR,
role VARCHAR,
adress VARCHAR,
photo VARCHAR,
gender VARCHAR,
phoneNumber VARCHAR,
verif INT,
otp INT
);

CREATE TABLE artikel(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    bacgroundPhoto VARCHAR,
    mainContent VARCHAR,
    content1 VARCHAR,
    titleContent2 VARCHAR,
    content2 VARCHAR,
    titleContent3 VARCHAR,
    content3 VARCHAR,
    titleContent4 VARCHAR,
    content4 VARCHAR,
    titleContent5 VARCHAR,
    content5 VARCHAR,
    users_id VARCHAR REFERENCES user_artikel(id),
    subTema VARCHAR
);





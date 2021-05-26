CREATE USER "olaru" WITH ENCRYPTED PASSWORD 'lilieci';
GRANT ALL PRIVILEGES ON DATABASE db_test TO olaru;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO olaru;

CREATE TYPE cat_autoturism AS ENUM ('toate','autocar','microbuz');
CREATE TYPE t_transport AS ENUM('50_locuri', '45_locuri', '40_locuri', '30_locuri', '35_locuri');

CREATE TABLE IF NOT EXISTS autoturisme (
id serial PRIMARY KEY,
nume VARCHAR(50) UNIQUE NOT NULL,
descriere TEXT, 
categorie cat_autoturism default 'toate' , --categorie mare
tip_transport t_transport default '40_locuri', --categorizare mai putin importanta
pret_km NUMERIC(8,2) NOT NULL CHECK(pret_km>0),
nr_locuri INT NOT NULL, 
imagine VARCHAR(300),
data_achizitionare TIMESTAMP DEFAULT current_timestamp,
culoare VARCHAR(15),
caracteristici VARCHAR[], 
aer_contidionat BOOLEAN NOT NULL DEFAULT FALSE
); 

INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Autocar Setra S1','Autocar predestinat excursiilor', '50_locuri','autocar',2.5, 50, 'a1.jpg', 'alb', '{"ac","tv","radio","frigider"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Autocar Isuzu I1','Autocar predestinat excursiilor', '45_locuri','autocar',3.0, 45, 'a2.jpg', ' verde', '{"tv","radio","frigider"}', False);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES  
('Autocar Mercedes M1','Autocar predestinat excursiilor', '40_locuri','autocar',4.2, 40, 'a3.jpg', 'negru', '{"ac","tv","radio"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES  
('Autocar Setra S2','Autocar predestinat excursiilor', '40_locuri','autocar',2.5, 40, 'a4.jpg', 'alb', '{"ac","tv","frigider"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES  
('Autocar Mercedes M2','Autocar predestinat excursiilor', '45_locuri','autocar',4.2, 45, 'a5.jpg', 'negru', '{"ac","frigider"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES  
('Microbuz Iveco I1','Autocar predestinat excursiilor', '30_locuri','microbuz',3.0, 30, 'a6.jpg', 'albastru', '{"ac","tv","radio","frigider","bufet"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Microbuz Mercedes M1','Autocar predestinat excursiilor', '35_locuri','microbuz',2.6, 35, 'a7.jpg', 'alb', '{"ac","tv","radio","bufet"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Autocar Setra S3','Autocar predestinat excursiilor', '40_locuri','autocar',2.5, 40, 'a8.jpg', 'verde', '{"radio","frigider"}', False);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES  
('Microbuz Iveco I2','Autocar predestinat excursiilor', '30_locuri','microbuz',3.0, 30, 'a9.jpg', 'albastru', '{"ac","tv","radio","frigider"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Autocar Isuzu I2','Autocar predestinat excursiilor', '50_locuri','autocar',4.5, 50, 'a10.jpg', 'negru', '{"ac","frigider"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Microbuz Mercedes M2','Autocar predestinat excursiilor', '35_locuri','microbuz',2.5, 35, 'a11.jpg', 'alb', '{"ac","frigider","bufet"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Microbuz Iveco I3','Autocar predestinat excursiilor', '30_locuri','microbuz',2.6, 30, 'a12.jpg', 'verde', '{"ac","tv","radio","frigider"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Microbuz Mercedes M3','Autocar predestinat excursiilor', '30_locuri','microbuz',2.7, 30, 'a13.jpg', 'negru', '{"ac","radio","frigider"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES 
('Microbuz Iveco I4','Autocar predestinat excursiilor', '35_locuri','microbuz',4.5, 35, 'a14.jpg', 'alb', '{"ac","tv","bufet"}', True);
INSERT INTO autoturisme (nume, descriere, tip_transport, categorie, pret_km, nr_locuri, imagine, culoare,caracteristici, aer_contidionat) VALUES  
('Autocar Setra S4','Autocar predestinat excursiilor', '50_locuri','autocar',2.5, 50, 'a15.jpg', 'albastru', '{"tv","radio","frigider"}', False);
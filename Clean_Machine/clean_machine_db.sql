CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Voeg categorieën toe aan de 'categories' tabel
INSERT INTO categories (category_name) VALUES ('Hygiene');
INSERT INTO categories (category_name) VALUES ('Machines');
INSERT INTO categories (category_name) VALUES ('Wasmiddelen');
INSERT INTO categories (category_name) VALUES ('Materialen');
INSERT INTO categories (category_name) VALUES ('Afval');
-- Voeg meer categorieën toe indien nodig

-- Voeg producten toe aan de 'products' tabel en koppel ze aan categorieën

CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

--Tabel voor many-to-many relatie tussen Producten en Categorieën
CREATE TABLE product_categories (
    product_category_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    category_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Voorbeeld om producten aan categorieën toe te wijzen
-- Product 1 behoort tot Categorie 1 (Hygiene)
INSERT INTO product_categories (product_id, category_id) VALUES (1, 1);
INSERT INTO product_categories (product_id, category_id) VALUES (2, 1);
INSERT INTO product_categories (product_id, category_id) VALUES (3, 1);
INSERT INTO product_categories (product_id, category_id) VALUES (4, 1);
INSERT INTO product_categories (product_id, category_id) VALUES (5, 1);
INSERT INTO product_categories (product_id, category_id) VALUES (6, 1);
INSERT INTO product_categories (product_id, category_id) VALUES (7, 1);
INSERT INTO product_categories (product_id, category_id) VALUES (8, 1);

INSERT INTO product_categories (product_id, category_id) VALUES (9, 2);
INSERT INTO product_categories (product_id, category_id) VALUES (10, 2);
INSERT INTO product_categories (product_id, category_id) VALUES (11, 2);
INSERT INTO product_categories (product_id, category_id) VALUES (12, 2);
INSERT INTO product_categories (product_id, category_id) VALUES (13, 2);
INSERT INTO product_categories (product_id, category_id) VALUES (14, 2);

INSERT INTO product_categories (product_id, category_id) VALUES (15, 3);
INSERT INTO product_categories (product_id, category_id) VALUES (16, 3);
INSERT INTO product_categories (product_id, category_id) VALUES (17, 3);
INSERT INTO product_categories (product_id, category_id) VALUES (18, 3);
INSERT INTO product_categories (product_id, category_id) VALUES (19, 3);
INSERT INTO product_categories (product_id, category_id) VALUES (20, 3);
INSERT INTO product_categories (product_id, category_id) VALUES (21, 3);

INSERT INTO product_categories (product_id, category_id) VALUES (22, 4);
INSERT INTO product_categories (product_id, category_id) VALUES (23, 4);
INSERT INTO product_categories (product_id, category_id) VALUES (24, 4);
INSERT INTO product_categories (product_id, category_id) VALUES (25, 4);
INSERT INTO product_categories (product_id, category_id) VALUES (26, 4);
INSERT INTO product_categories (product_id, category_id) VALUES (27, 4);
INSERT INTO product_categories (product_id, category_id) VALUES (28, 4);

INSERT INTO product_categories (product_id, category_id) VALUES (29, 5);
INSERT INTO product_categories (product_id, category_id) VALUES (30, 5);
INSERT INTO product_categories (product_id, category_id) VALUES (31, 5);
INSERT INTO product_categories (product_id, category_id) VALUES (32, 5);
INSERT INTO product_categories (product_id, category_id) VALUES (33, 5);


-- Voorbeeldproducten voor de categorie 'Hygiene'
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('rode handzeep', 10.00, 'Dit is rode zeep.', 1, 2); -- Product behoort tot categorie 1 (Hygiene)
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('blauwe handzeep', 12.00, 'Dit is blauwe zeep.', 1, 2);
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('groene zeep', 14.00, 'Dit is groene zeep', 1, 2);
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('een enkele rol', 10.00, 'Dit is een enkele rol', 1, 2);
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('meerdere rollen', 12.00, 'Dit zijn meerdere rollen', 1, 1);
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('roze luchtverfrisser', 10.00, 'Dit is een roze luchtverfrisser', 1, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('gele luchtverfrisser', 12.00, 'Dit is een roze luchtverfrisser', 1, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('toiletborstel', 10.00, 'Dit is een toiletborstel', 1, 2); 

-- Voorbeeldproducten voor de categorie 'Machines'
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('blije stofzuiger', 10.00, 'Dit is een blije stofzuiger.', 2, 2);
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('zielige stofzuiger',12.00 , 'Dit is een zielige stofzuiger', 2, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('blauwe tapijtreiniger', 10.00, 'Dit is een blauwe tapijtreiniger', 2, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('gele tapijtreiniger', 12.00, 'Dit is een gele tapijtreiniger', 2, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('enkele hogedrukreiniger', 10.00, 'Dit is een enkele hogedrukreiniger', 2, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('all in one hogedrukreiniger', 12.00, 'Dit is een all in one hogedrukreiniger', 2, 1); 

-- Voorbeeldproducten voor de categorie 'Wasmiddelen'
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('witte capsules', 10.00, 'Dit zijn witte capsules', 3, 1); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('kleur capsules', 12.00, 'Dit zijn kleur capsules', 3, 1); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('wit waspoeder', 10.00, 'Dit is wit waspoeder', 3, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('kleur waspoeder', 12.00, 'Dit is kleur waspoeder', 3, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('paars vloeibaar wasmiddel', 10.00, 'Dit is paars vloeibaar wasmiddel', 3, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('blauw vloeibaar wasmiddel', 12.00, 'Dit is blauw vloeibaar wasmiddel', 3, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('beer wasverzachter', 10.00, 'Dit is beer wasverzachter :)', 3, 2); 

-- Voorbeeldproducten voor de categorie 'Materialen'
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('enkele spons', 10.00, 'Dit is een enkele spons', 4, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('meerdere sponzen', 12.00, 'Dit zijn meerdere sponzen', 4, 1); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('enkele reinigingsdoek', 10.00, 'Dit is een enkele reinigingsdoek', 4, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('meerdere reinigingsdoeken', 12.00, 'Dit zijn meerdere reinigingsdoeken', 4, 1); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('emmer lol', 10.00, 'Dit is een emmer xD', 4, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('enkele bezem', 10.00, 'Dit is een enkele bezem', 4, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('meerdere bezems', 12.00, 'Dit zijn meerdere bezems', 4, 1); 

-- Voorbeeldproducten voor de categorie 'Afval'
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('enkele afvalzak', 10.00, 'Dit is een enkele afvalzak', 5, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('meerdere afvalzakken', 12.00, 'Dit zijn meerdere afvalzakken', 5, 1); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('afvalbak', 10.00, 'Dit is een afvalbak', 5, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('pedaalemmer', 10.00, 'Dit is een pedaalemmer', 5, 2); 
INSERT INTO product (product_name, price, description, category_id, supplier_id) VALUES ('asbak', 10.00, 'Dit is een asbak', 5, 2);  

-- Voeg meer producten toe en koppel ze aan de juiste categorieën



CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(255) NOT NULL,
    supplier_address VARCHAR(255),
    contact_person_name VARCHAR(255),
    contact_person_email VARCHAR(255)
);

-- Voeg leverancier "Top G Leveranciers" toe
INSERT INTO suppliers (supplier_name, supplier_address, contact_person_name, contact_person_email)
VALUES ('Top G Leveranciers', 'Roemenië', 'Top G', 'topG@gmail.com');

-- Voeg leverancier "Bottom G Leveranciers" toe
INSERT INTO suppliers (supplier_name, supplier_address, contact_person_name, contact_person_email)
VALUES ('Bottom G Leveranciers', 'Frankrijk', 'Bottom G', 'bottomG@gmail.com');



CREATE TABLE delivery_providers (
    delivery_provider_id INT AUTO_INCREMENT PRIMARY KEY,
    provider_name VARCHAR(255) NOT NULL,
    provider_address VARCHAR(255),
    contact_person_name VARCHAR(255),
    contact_person_email VARCHAR(255)
);

-- Voeg bezorger "Top G Bezorgers" toe
INSERT INTO delivery_providers (provider_name, provider_address, contact_person_name, contact_person_email)
VALUES ('Top G Bezorgers', 'Roemenië', 'Top G', 'topG@gmail.com');

-- Voeg bezorger "Bottom G Bezorgers" toe
INSERT INTO delivery_providers (provider_name, provider_address, contact_person_name, contact_person_email)
VALUES ('Bottom G Bezorgers', 'Frankrijk', 'Bottom G', 'bottomG@gmail.com');



CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    hire_date DATE,
    job_title VARCHAR(255)
);

-- Voeg medewerker 1 toe
INSERT INTO employees (employee_name, employee_address, employee_phone, employee_position)
VALUES ('KSI', 'KSI Amelia House', '+1 (664) 609-7030', 'magazijnmedewerker');

-- Voeg medewerker 1 toe
INSERT INTO employees (employee_name, employee_address, employee_phone, employee_position)
VALUES ('W2S', '71-75, Shelton Street', '07455 245645', 'verkoopmedewerker');

-- Voeg medewerker 1 toe
INSERT INTO employees (employee_name, employee_address, employee_phone, employee_position)
VALUES ('Vikkstar123', 'Amelia house', '+1-213-229-8891', 'klantenservice');

-- Voeg medewerker 1 toe
INSERT INTO employees (employee_name, employee_address, employee_phone, employee_position)
VALUES ('Miniminter', 'Amelia house', '+44 7488884799', 'manager');

-- Voeg medewerker 1 toe
INSERT INTO employees (employee_name, employee_address, employee_phone, employee_position)
VALUES ('TBJZL', '12660 Ashford Point Dr', '(713) 205-4877', 'technicus');



CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    employee_id INT,
    delivery_provider_id INT,
    order_date DATE NOT NULL,
    delivery_address VARCHAR(255) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (delivery_provider_id) REFERENCES delivery_providers(delivery_provider_id)
);



CREATE TABLE order_details (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);



CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL,
);



ALTER TABLE products
ADD COLUMN supplier_id INT,
ADD CONSTRAINT fk_supplier
FOREIGN KEY (supplier_id)
REFERENCES suppliers(supplier_id);



ALTER TABLE orders
ADD COLUMN customer_id INT,
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id)
REFERENCES customers(customer_id);



-- Voeg een kolom 'employee_id' toe aan de 'orders' tabel om de relatie met medewerkers te leggen
ALTER TABLE orders
ADD COLUMN employee_id INT,
ADD CONSTRAINT fk_employee
FOREIGN KEY (employee_id)
REFERENCES employees(employee_id);




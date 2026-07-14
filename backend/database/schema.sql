-- USERS
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer',
    failed_attempts INTEGER DEFAULT 0,
    locked_until BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONTRACTORS
CREATE TABLE IF NOT EXISTS contractors (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    city VARCHAR(100),
    phone VARCHAR(25),
    rating DECIMAL(2,1) DEFAULT 5.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ESTIMATES
CREATE TABLE IF NOT EXISTS estimates (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(25),
    contractor_id INTEGER REFERENCES contractors(id),
    project_type VARCHAR(255),
    description TEXT,
    budget DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    rating INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SECURITY LOGS
CREATE TABLE IF NOT EXISTS security_logs (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    status VARCHAR(100),
    ip_address VARCHAR(100),
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
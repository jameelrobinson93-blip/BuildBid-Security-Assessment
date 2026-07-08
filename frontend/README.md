# BuildBid Security Assessment Capstone

## Overview

BuildBid is a full-stack contractor marketplace application developed with React, Express.js, and SQLite.

This capstone demonstrates both secure web application development and a cybersecurity assessment. The project includes identifying common web application vulnerabilities, implementing security controls, and verifying the improvements after remediation.

---

## Technologies Used

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- SQLite

### Security
- Helmet
- Express Rate Limit
- CORS
- OWASP ZAP

---

## Features

- Browse contractors
- View contractor information
- Request project estimates
- Responsive React interface
- REST API backend
- SQLite database

---

## Security Assessment

### Vulnerabilities Identified

- Missing HTTP Security Headers
- Express Information Disclosure (`X-Powered-By`)
- Overly Permissive CORS Policy

### Security Improvements

- Implemented Helmet security headers
- Removed Express framework disclosure
- Restricted CORS to the frontend application
- Added API rate limiting

---

## Project Structure

```
BuildBid
│
├── backend
├── frontend
└── docs
```

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Author

**Jameel Robinson**

Cybersecurity Analyst | Google Cybersecurity Professional Certificate | Security+ Candidate
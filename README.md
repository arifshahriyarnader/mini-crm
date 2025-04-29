# Mini CRM for Freelancers
    - This project is a Mini CRM (Client Relationship Management) system for freelancers to manage their clients, projects, interaction logs, and reminders.

## Tech Stack Used
    - **Client**: React JS, TypeScript, Tailwind CSS
    - **Server**: Node JS, Express JS, TypeScript
    - **Database**: MongoDB (Mongoose ORM)
    - **API Testing**: Postman

## Set Up Insstruction

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/arifshahriyarnader/mini-crm.git

2. Navigate to the server folder:
    ```bash
    cd server

3. Install Dependencies
   ```bash
   npm install

4. Create a .env file:
    ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

5. Start the server:
   ```bash
   npm run dev

### Client Setup

1. Open a new terminal and navigate to the client folder:
    ```bash
    cd client

2. Install Dependencies:
    ```bash
    npm install

3. Create a .env file:
    ```bash
    VITE_API_URL=http://localhost:5000
    VITE_CURRENT_USER_KEY=MINI_CRM_LOGGED_IN_USER

4. Start the frontend development server:
    ```bash
    npm run dev

## ERD (Entity Relationship Diagram)

**User**:
- _id (primary key)
- email (unique)
- passwordHash
-  role (enum: 'user', 'admin')
- createdAt
- updatedAt

**Client**:
- _id (primary key)
- userId (foreign key to user )
- name
- email (unique)
- phone
- company
- notes
- createdAt
- updatedAt

**Project**:
- id (primary key)
- clientId (foreign key to client)
- userId (foreign key to user )
- title
- budget
- deadline
- status (enum: planning, in-progress, completed, on-hold)
- createdAt
- updatedAt

**Interaction**:
- id (primary key)
- clientId (foreign key to client)
- projectId (foreign key to Project, Optional)
- userId (foreign key)
- type (enum: call, meeting, email)
- notes
- date
- createdAt

**Reminder**:
- _id (primary key)
- userId(foreign key to user )
- clientId (foreign key to client, optional)
- projectId (foreign key to project, optional)
- title
- notes
- dueDate
- isCompleted
- createdAt
- updatedAt




# Mini CRM for Freelancers

- This project is a Mini CRM (Client Relationship Management) system for freelancers to manage their clients, projects, interaction logs, and reminders.

## Tech Stack Used

- **Client**: React JS, TypeScript, Tailwind CSS
- **Server**: Node JS, Express JS, TypeScript
- **Database**: MongoDB (Mongoose ORM)
- **API Testing**: Postman

## Set Up Instruction

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

## Summary of Approach
- Authentication: Implemented using JWT tokens with access and refresh tokens.
- Modular Code Structure: Organized backend using routes, controllers, services, and   middlewares for scalability.
- State Management: Managed frontend state locally in React components for simplicity.
- Data Fetching: Used Axios for API requests.
- Error Handling: Basic try-catch error handling and user alerts on the client side.
- Mobile Responsive UI: Built using Tailwind CSS for fast and clean designs.

## Sample Test User
1. You can either sign up through the signup page, or use the following test credentials
    ```
    Email: test@gmail.com
    Password: Test1234
    

## Decisions and Reasoning
**Theme Preference Persistence**:  
- I implemented theme persistence using `localStorage`.
- On page load (`useEffect`), I check if `"darkMode"` is saved in `localStorage`, and add or remove the `dark` class on the `<html>` element accordingly.
- When the user logs out, I clean up by removing `"darkMode"` from `localStorage`.

**Dashboard Data Visualization**:  
- Since dashboard data visualization was open-ended, I focused on displaying clear tables for Clients and projects.
- I will use libraries like `Recharts` or `Chart.js` for advanced visualization to show project statistics or earnings graphs. 

## Folder/Module Structure

    server/
        src/
        routes/
        controllers/
        services/
        models/
        middlewares/
    

    client/
        src/
        api/
            services/
        common/
            config/
            https/
        auth/
        components/
        pages/
        hooks/
        router/
    

## Final Notes
- Code is modular and easy to maintain.
- The theme preference is persisted across sessions.
- API is tested via Postman collections.
- Future improvements can include advanced analytics on the dashboard.

# Thank You
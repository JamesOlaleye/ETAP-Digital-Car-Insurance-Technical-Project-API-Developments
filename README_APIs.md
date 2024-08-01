# 📚 School Architecture API Endpoints

The following endpoints are from the backend, using PostgreSQL as the database and Prisma as the ORM.

## Authentication Endpoints

1. **Register a User**
   - **Endpoint:** `POST http://127.0.0.1:3220/auth/register`
   - **Description:** Register a new user.

2. **Login a User**
   - **Endpoint:** `POST http://127.0.0.1:3220/auth/login`
   - **Description:** Login an existing user.

## User Endpoints

3. **Get a User**
   - **Endpoint:** `GET http://127.0.0.1:3220/user/:id`
   - **Description:** Retrieve a user by ID.

4. **Get All Users**
   - **Endpoint:** `GET http://127.0.0.1:3220/user`
   - **Description:** Retrieve all users.

5. **Promote to Teacher**
   - **Endpoint:** `POST http://127.0.0.1:3220/user/promote/:id`
   - **Description:** Promote a user to a teacher.

## Subject Endpoints

6. **Create a Subject**
   - **Endpoint:** `POST http://127.0.0.1:3220/subject/`
   - **Description:** Create a new subject.

7. **Get All Subjects**
   - **Endpoint:** `GET http://127.0.0.1:3220/subject/`
   - **Description:** Retrieve all subjects.

8. **Get a Subject**
   - **Endpoint:** `GET http://127.0.0.1:3220/subject/:id`
   - **Description:** Retrieve a subject by ID.

9. **Assign Teacher to a Subject**
   - **Endpoint:** `PATCH http://127.0.0.1:3220/subject/assign`
   - **Description:** Assign a teacher to a subject.

10. **Enroll in a Subject**
    - **Endpoint:** `POST http://127.0.0.1:3220/subject/enroll`
    - **Description:** Enroll a student in a subject.

## Topic Endpoints

11. **Create a Topic**
    - **Endpoint:** `POST http://127.0.0.1:3220/topic/`
    - **Description:** Create a new topic.

12. **Update a Topic**
    - **Endpoint:** `PUT http://127.0.0.1:3220/topic/`
    - **Description:** Update an existing topic.

13. **Get a Topic**
    - **Endpoint:** `GET http://127.0.0.1:3220/topic/:id`
    - **Description:** Retrieve a topic by ID.

14. **Get Topics by Subject**
    - **Endpoint:** `GET http://127.0.0.1:3220/topic/subject/:id`
    - **Description:** Retrieve topics by subject ID.

15. **Upload a Video for a Topic**
    - **Endpoint:** `PATCH http://127.0.0.1:3220/topic/video`
    - **Description:** Upload a video for a topic using multer, Cloudinary, and streamifier.

## Progress Endpoints

16. **Create Progress Status**
    - **Endpoint:** `POST http://127.0.0.1:3220/progress/`
    - **Description:** Create a new progress status.

17. **Update Progress Status**
    - **Endpoint:** `PATCH http://127.0.0.1:3220/progress/`
    - **Description:** Update an existing progress status.

18. **Get Personal Progress**
    - **Endpoint:** `GET http://127.0.0.1:3220/progress/mine/:id`
    - **Description:** Retrieve the progress of a student by their ID.

19. **Get Progress by Subject**
    - **Endpoint:** `GET http://127.0.0.1:3220/progress/mine/subject/:id`
    - **Description:** Retrieve progress for a specific subject by ID.

20. **Rank Learners**
    - **Endpoint:** `GET http://127.0.0.1:3220/progress/rank/:id`
    - **Description:** Rank learners or students. Admin and teachers can view the ranking of learners for a subject.

# 📚 ETAP School-API

### Click on this link to view the URL for published documentation: [📄 View Full Documentation](https://documenter.getpostman.com/view/24605564/2sA3rxqDTE)

### Documentation

---

#### Operation: Admin registration

- **Description:** The correct adminKey must be provided for admin registration.
- **URL:** `/auth/register`
- **Method:** POST
- **Example:**
  ```json
  {
    "firstName": "nameExample",
    "lastName": "nameExample",
    "email": "example@mail.com",
    "password": "123456",
    "adminKey": "administrator"
  }
  ```

---

#### Operation: Register a User

- **Description:** Register a new user.
- **URL:** `/auth/register`
- **Method:** POST
- **Example:**
  ```json
  {
    "firstName": "nameExample",
    "lastName": "nameExample",
    "email": "example@mail.com",
    "password": "123456"
  }
  ```

---

#### Operation: Login a User

- **Description:** Login an existing user.
- **URL:** `/auth/login`
- **Method:** POST
- **Example:**
  ```json
  {
    "email": "james@mail.com",
    "password": "123456"
  }
  ```

---

#### Operation: Get a User

- **Description:** Retrieve a user by ID.
- **URL:** `/user/:id`
- **Method:** GET

---

#### Operation: Get All Users

- **Description:** Retrieve all users.
- **URL:** `/user`
- **Method:** GET

---

#### Operation: Promote a User to Teacher

- **Description:** Promote a user to a teacher. (Admin authorization required)
- **URL:** `/user/promote/:id`
- **Method:** PATCH

---

#### Operation: Create a Subject

- **Description:** Create a new subject. (Admin authorization required)
- **URL:** `/subject/`
- **Method:** POST
- **Example:**
  ```json
  {
    "name": "Algorithm & Data Structure"
  }
  ```

---

#### Operation: Get All Subjects

- **Description:** Retrieve all subjects.
- **URL:** `/subject/`
- **Method:** GET

---

#### Operation: Get a Subject

- **Description:** Retrieve a subject by ID.
- **URL:** `/subject/:id`
- **Method:** GET

---

#### Operation: Assign Teacher to a Subject

- **Description:** Assign a teacher to a subject. (Admin authorization required)
- **URL:** `/subject/assign`
- **Method:** PATCH
- **Example:**
  ```json
  {
    "id": "acb7a95d-3e1c-4228-9c6a-a1f56ce2f2af",
    "teacherId": "ab8f0cf5-61a3-4385-a322-a76364a66af9"
  }
  ```

---

#### Operation: Enroll in a Subject

- **Description:** Enroll a student in a subject. (Student authorization required)
- **URL:** `/subject/enroll`
- **Method:** POST
- **Example:**
  ```json
  {
    "id": "27e19635-7f21-44e1-926d-b5c377eeeda5"
  }
  ```

---

#### Operation: Create a Topic

- **Description:** Create a new topic. (Teacher authorization required)
- **URL:** `/topic/`
- **Method:** POST
- **Example:**
  ```json
  {
    "title": "Fundamentals of Artificial Intelligence",
    "subjectId": "27e19635-7f21-44e1-926d-b5c377eeeda5",
    "description": "Artificial Intelligence is taking over the Global Space In Technological Advancements"
  }
  ```

---

#### Operation: Update a Topic

- **Description:** Update an existing topic. (Teacher authorization required). Other fields in request body are optional parameter if you care to update.
- **URL:** `/topic/`
- **Method:** PUT
- **Example:**
  ```json
  {
    "id": "6cdefc14-470a-45c3-9b3b-57b1aca68a93",
    "title": "Block Chain Technology",
    "description": "Leading Market in Tech Eco-System"
  }
  ```

---

#### Operation: Get a Topic

- **Description:** Retrieve a topic by ID. (Registered users authorized)
- **URL:** `/topic/:id`
- **Method:** GET

---

#### Operation: Get Topics by Subject

- **Description:** Retrieve topics by subject ID. (Registered users authorized)
- **URL:** `/topic/subject/:id`
- **Method:** GET

---

#### Operation: Upload a Video for a Topic

- **Description:** Upload a video for a topic. (Teacher Assigned authorization required)
- **URL:** `/topic/video`
- **Method:** PATCH
- **Example:**
  ```json
  {
    "id": "6cdefc14-470a-45c3-9b3b-57b1aca68a93",
    "video": "upload video as file here not text"
  }
  ```

---

#### Operation: Create Progress Status

- **Description:** Create a new progress status. (API key required)
- **URL:** `/progress/`
- **Method:** POST
- **Example:**
  ```json
  {
    "studentId": "e575b108-ef45-4009-bdd7-fab40bde2508",
    "topicId": "6cdefc14-470a-45c3-9b3b-57b1aca68a93",
    "apiKey": "progress-secret-key"
  }
  ```

---

#### Operation: Update Progress Status

- **Description:** Update an existing progress status. (API key required)
- **URL:** `/progress/`
- **Method:** PATCH
- **Example:**
  ```json
  {
    "studentId": "e575b108-ef45-4009-bdd7-fab40bde2508",
    "topicId": "6cdefc14-470a-45c3-9b3b-57b1aca68a93",
    "apiKey": "progress-secret-key",
    "progress": "5"
  }
  ```

---

#### Operation: Get My Progress in Subject

- **Description:** Retrieve the progress of a student by their ID. (Student authorization required)
- **URL:** `/progress/mine/:id`
- **Method:** GET

---

#### Operation: Get Progress of All Students

- **Description:** Retrieve progress for a specific subject by ID. (Teacher/Admin authorization required)
- **URL:** `/progress/subject/:id`
- **Method:** GET

---

#### Operation: View Rankings of Students in a Subject

- **Description:** Rank students who took a subject based on their completion rate. (Teacher/Admin authorization required)
- **URL:** `/progress/rank/:id`
- **Method:** GET

---

# 🏫 SCHOOL ARCHITECTURE

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 📚 Table of Contents

1. [Entities](#entities)
   - [Users](#users)
   - [Subjects](#subjects)
   - [Topics](#topics)
   - [Progress](#progress)
2. [Attributes](#attributes)
   - [User Attributes](#user-attributes)
   - [Subject Attributes](#subject-attributes)
   - [Topic Attributes](#topic-attributes)
   - [Progress Attributes](#progress-attributes)
3. [Usage](#usage)
4. [Installation](#installation)
5. [Running the App](#running-the-app)
6. [Test](#test)
7. [License](#license)
8. [Contact](#contact)

## 📂 Entities

### Users

- **Name**
- **Email**
- **Password**
- **Role** (e.g., teacher, student)
- **Subjects** (subjects the user is associated with)
- **Progress** (progress in different subjects/topics)

### Subjects

- **Title**
- **Topics** (list of topics covered in the subject)
- **Teacher** (teacher responsible for the subject)
- **Students** (students enrolled in the subject)

### Topics

- **Title**
- **Description**
- **Video** (video resources for the topic)
- **Progress** (progress of users in the topic)

### Progress

- **Student**
- **Topic**
- **Status** (status of the student's progress in the topic)

## 📝 Attributes

### User Attributes

- **Name**: The full name of the user.
- **Email**: The email address of the user.
- **Password**: A secure password for user authentication.
- **Role**: The role of the user within the system, either as a teacher or a student.
- **Subjects**: The subjects that the user is associated with, either teaching or learning.
- **Progress**: The progress made by the user in various subjects and topics.

### Subject Attributes

- **Title**: The name of the subject.
- **Topics**: A list of topics that are covered within the subject.
- **Teacher**: The teacher assigned to the subject.
- **Students**: The students who are enrolled in the subject.

### Topic Attributes

- **Title**: The name of the topic.
- **Description**: A brief description of what the topic covers.
- **Video**: Any video resources available for the topic.
- **Progress**: The progress made by users in the topic.

### Progress Attributes

- **Student**: The student associated with the progress record.
- **Topic**: The topic associated with the progress record.
- **Status**: The current status of the student's progress in the topic.

## 📌 Usage

This README provides a basic outline of the entities and attributes used in the school architecture system. For more detailed information, please refer to the project's documentation or source code.

## 🛠️ Installation

````bash
$ yarn install

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```markdown

## 🧪 Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```markdown

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For questions or feedback, please contact James Olanipekun @jamesfullstackdeveloper@gmail.com.
````

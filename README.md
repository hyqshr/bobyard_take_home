# Django DRF & React Full Stack Demo Project
This project is a full-stack application built with Django Rest Framework (DRF) for the backend and React for the frontend. It demonstrates basic CRUD operations on comments.

# Setup
### Backend Setup
Navigate to the Backend Folder:
```
cd backend
```
Create and activate Virtual Environment (Optional but recommended):
```
pip install -r requirements.txt
```

Run Migrations (If necessary):
```
python manage.py migrate
```

Run Migrations (If necessary):

Start the Django Server:

```
python manage.py runserver
```

Load Initial Data:

```
python load_comments.py
```

You can navigate to `localhost:8000/swagger` to test the API.


## Frontend Setup
Navigate to the Frontend Folder:

```
cd frontend
```

start:
```
npm i && npm start
```

The application should now be running and accessible at localhost:3000.
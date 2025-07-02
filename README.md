# Events App

![Screenshot](/images/image.png)

## Overview

This web app lets users discover and create events happening in Timișoara.

- Users can register and log in securely.  
- Logged-in users can create and manage events.  
- Example: The Timișoara City Hall can create an account to post official events.  
- Open to everyone: anyone can sign up and contribute.  
- Passwords are encrypted for security.  
- Sessions are managed with cookies for a smooth experience.

## Screenshots
![Screenshot](/images/image1.png)
![Screenshot](/images/image3.png)
![Screenshot](/images/image4.png)

## Getting Started

1. Install Python packages:
  ```bash
  pip install -r requirements.txt
  ```

2. Update app/config.yaml with your PostgreSQL database details.
3. Create the database tables by running the provided SQL
    ```bash
    postgres_table_creation.sql
    ```
4. Run the Flask app
   ```bash
   run.py
   ```

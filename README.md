# Trading Heatmap

A Django-based web application to **track trades** and visualize profits and losses with a calendar-like heatmap.

The goal is to make trade tracking simple, organized, and useful for later review and **tax reporting**.

## Features
- **Heatmap view** of daily trading activity.
- **Calendar-style organization** for easy visualization.  
- **Notes per trade** for context and journaling.  
- **File upload per trade** (e.g., broker contract notes, reports, or receipts).  
- **Organized storage of uploaded files** to simplify tax filing later.  

## Running on Dev

1. Create & Activate Virtual Environment

```shell
# Create virtual environment
python -m venv venv

# Activate venv
# On Linux / macOS:
source ./venv/bin/activate

# On Windows (PowerShell):
.\venv\Scripts\activate
```

2. Install Requirements

```shell
pip install -r requirements.txt
```

3. Apply Migrations
   
```shell
python manage.py migrate
```

4. Running Development Server

```shell
python manage.py runserver
```

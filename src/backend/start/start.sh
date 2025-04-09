#!/bin/bash
cd {your_working_directory}
gunicorn --chdir {your_working_directory} src.backend.backend:app --bind 0.0.0.0:5000 --workers 3

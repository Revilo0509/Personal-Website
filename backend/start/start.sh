#!/bin/bash
cd /home/PersonalWebsite/Personal-Website
gunicorn --chdir /home/PersonalWebsite/Personal-Website backend.backend:app --bind 0.0.0.0:5000 --workers 3

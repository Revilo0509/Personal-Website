#!/bin/bash
cd /home/PersonalWebsite/Personal-Website
git pull origin main
systemctl restart personalwebsite.service &
systemctl restart discordbot.service &
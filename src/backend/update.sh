#!/bin/bash
cd /home/PersonalWebsite/Personal-Website
git pull origin main
systemctl restart personalwebsite.service &
sleep 5
systemctl restart discordbot.service &
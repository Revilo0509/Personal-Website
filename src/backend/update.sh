#!/bin/bash
cd {path_to_your_project}
git pull origin main
systemctl restart {systemctl service name/file} &
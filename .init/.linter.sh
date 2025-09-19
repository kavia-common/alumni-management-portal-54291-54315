#!/bin/bash
cd /home/kavia/workspace/code-generation/alumni-management-portal-54291-54315/alumni_management_system_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


@echo off
title GreenBin — AI-Powered Smart Waste Management Platform
color 0A
echo ================================================================
echo 🌱 Starting GreenBin Platform...
echo ================================================================
echo.
echo Opening GreenBin web application in your browser...
start http://localhost:5005
echo.
echo Server running at http://localhost:5005
echo Press Ctrl+C to stop the server.
echo.
node backend/server.js

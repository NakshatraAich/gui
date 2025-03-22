import subprocess
import os
import time
import webbrowser

# Define absolute paths
project_root = os.path.expanduser("~/gui")
backend_path = os.path.join(project_root, "backend")
frontend_path = os.path.join(project_root, "frontend")
venv_path = os.path.join(backend_path, "venv", "bin", "activate")

# Ensure paths exist
if not os.path.exists(backend_path):
    print(f"❌ Error: Backend path '{backend_path}' not found!")
    exit(1)

if not os.path.exists(frontend_path):
    print(f"❌ Error: Frontend path '{frontend_path}' not found!")
    exit(1)

# Start FastAPI backend (with virtual environment)
print("🚀 Starting FastAPI backend...")
backend_process = subprocess.Popen(
    f"source {venv_path} && uvicorn server:app --host 0.0.0.0 --port 8000 --reload",
    cwd=backend_path,
    shell=True,
    executable="/bin/bash"
)

# Start frontend
print("🚀 Starting frontend...")
frontend_process = subprocess.Popen(
    ["npm", "run", "dev"],
    cwd=frontend_path
)

# Wait before opening the browser
time.sleep(5)
print("🌍 Opening http://localhost:5173 in the browser...")
webbrowser.open("http://localhost:5173")

# Keep both processes running
backend_process.wait()
frontend_process.wait()

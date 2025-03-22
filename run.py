import subprocess
import webbrowser
import os
import time

# Paths
backend_path = "gui\backend"
frontend_path = "gui\frontend"
venv_activate = os.path.join(backend_path, "venv", "bin", "activate")

# Start FastAPI Backend with venv
print("Starting FastAPI backend...")
backend_process = subprocess.Popen(
    f"source {venv_activate} && uvicorn server:app --host 0.0.0.0 --port 8000 --reload",
    cwd=backend_path,
    shell=True,
    executable="/bin/bash",  # Ensures Bash is used for sourcing venv
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

# Start Frontend
print("Starting frontend...")
frontend_process = subprocess.Popen(
    ["npm", "run", "dev"],
    cwd=frontend_path,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

# Wait for frontend to start (adjust if needed)
time.sleep(5)

# Open in browser
print("Opening frontend in browser...")
webbrowser.open("http://localhost:5173")

# Keep processes running
try:
    backend_process.wait()
    frontend_process.wait()
except KeyboardInterrupt:
    print("\nShutting down servers...")
    backend_process.terminate()
    frontend_process.terminate()

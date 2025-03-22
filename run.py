import subprocess
import os
import time
import webbrowser
import signal

# Define absolute paths
project_root = os.path.expanduser("~/gui")
backend_path = os.path.join(project_root, "backend")
frontend_path = os.path.join(project_root, "frontend")
uvicorn_path = os.path.join(backend_path, "venv", "bin", "uvicorn")

# Ensure paths exist
if not os.path.exists(backend_path):
    print(f"❌ Error: Backend path '{backend_path}' not found!")
    exit(1)

if not os.path.exists(frontend_path):
    print(f"❌ Error: Frontend path '{frontend_path}' not found!")
    exit(1)

# Start FastAPI backend
print("🚀 Starting FastAPI backend...")
backend_process = subprocess.Popen(
    [uvicorn_path, "server:app", "--host", "0.0.0.0", "--port", "8000", "--reload"],
    cwd=backend_path
)

# Start frontend
print("🚀 Starting frontend...")
frontend_process = subprocess.Popen(
    ["npm", "run", "dev"],
    cwd=frontend_path
)

# Wait before opening the browser
time.sleep(5)
print("🌍 Opening http://localhost:5173 in fullscreen...")

# Open browser in fullscreen (modify based on the browser available)
try:
    subprocess.Popen(["chromium-browser", "--kiosk", "http://localhost:5173"])  # For Raspberry Pi / Linux
except FileNotFoundError:
    try:
        subprocess.Popen(["google-chrome", "--kiosk", "http://localhost:5173"])  # For Chrome
    except FileNotFoundError:
        try:
            subprocess.Popen(["firefox", "--kiosk", "http://localhost:5173"])  # For Firefox
        except FileNotFoundError:
            webbrowser.open("http://localhost:5173")  # Fallback

# Gracefully handle termination
def cleanup(signum, frame):
    print("\n🛑 Shutting down processes...")
    backend_process.terminate()
    frontend_process.terminate()
    exit(0)

signal.signal(signal.SIGINT, cleanup)  # Handle Ctrl+C
signal.signal(signal.SIGTERM, cleanup)  # Handle termination signals

# Keep processes running
backend_process.wait()
frontend_process.wait()

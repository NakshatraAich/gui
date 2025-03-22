import os

# Get current directory
current_dir = os.getcwd()

# Define expected paths
backend_path = os.path.join(current_dir, "backend")
frontend_path = os.path.join(current_dir, "frontend")

# Print paths
print("Current Directory:", current_dir)
print("Backend Path:", backend_path)
print("Frontend Path:", frontend_path)

# Check if directories exist
print("\nChecking if directories exist:")
print(f"Backend exists: {'✅ Yes' if os.path.exists(backend_path) else '❌ No'}")
print(f"Frontend exists: {'✅ Yes' if os.path.exists(frontend_path) else '❌ No'}")

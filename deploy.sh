#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Define variables
LOCAL_DIST_DIR="./dist/"
REMOTE_USER="root"
REMOTE_HOST="dz_server"
REMOTE_PATH="/work/client/dist"

echo "Starting deployment to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

# Ensure the local dist directory exists
if [ ! -d "$LOCAL_DIST_DIR" ]; then
    echo "Error: Local dist directory '$LOCAL_DIST_DIR' not found. Please run 'npm run build' first."
    exit 1
fi

# Use rsync to synchronize the local dist directory with the remote directory
# -a: archive mode; equals -rlptgoD (no -H,-A,-X)
# -v: verbose
# -z: compress file data during the transfer
# --delete: delete extraneous files from destination dirs (useful for clean deployments)
rsync -avz --delete "$LOCAL_DIST_DIR" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

echo "Deployment completed successfully!"

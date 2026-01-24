FROM python:3.13-slim-bookworm
RUN apt-get update && apt-get install -y \
    redis-server \
    systemctl
RUN systemctl enable redis-server
COPY backend_env/requirements.txt requirements.txt
RUN pip install -r requirements.txt

FROM python:3.13-slim-bookworm
COPY backend_infra/requirements.txt requirements.txt
RUN pip install -r requirements.txt

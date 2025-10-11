FROM python:3.9-bookworm
RUN apt-get update && apt-get install -y \
  git \
  vim \


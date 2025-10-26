FROM python:3.13-slim-bookworm
COPY backend_infra/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN python -m spacy download ja_core_news_sm

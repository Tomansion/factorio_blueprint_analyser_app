# Vuejs Frontend
FROM node:18-alpine3.15 as build-stage
WORKDIR /frontend
COPY frontend/ .
RUN npm install
RUN npm run build

# Python Backend
FROM python:3.8-slim-buster
WORKDIR /backend
COPY backend/ .
RUN pip install --trusted-host pypi.python.org -r requirements.txt
COPY --from=build-stage /frontend/dist dist
ENV FASTAPI_ENV production
CMD ["python", "websrv.py"]


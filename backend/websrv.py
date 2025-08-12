from fastapi import FastAPI, Request
from fastapi.responses import Response, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
import uvicorn

DEV_FRONTEND_URL = "http://localhost:8080/"
BACK_PORT = 3000

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def send_frontend(path: str, request: Request):
    if path == "/":
        path = "index.html"

    # If production, use the index.html from the dist folder
    if os.getenv("FASTAPI_ENV") == "production":
        return FileResponse(f"dist/{path}")

    # In development, redirect to the DEV_FRONTEND_URL
    else:
        if request.method == "GET":
            try:
                resp = requests.get(f"{DEV_FRONTEND_URL}{path}")
                excluded_headers = [
                    "content-encoding",
                    "content-length",
                    "transfer-encoding",
                    "connection",
                ]
                headers = {
                    name: value
                    for name, value in resp.raw.headers.items()
                    if name.lower() not in excluded_headers
                }
                return Response(
                    resp.content, status_code=resp.status_code, headers=headers
                )
            except (requests.exceptions.ConnectionError, requests.exceptions.Timeout):
                return Response(
                    "You are in a development environment and the "
                    "frontend is not available at the url: " + DEV_FRONTEND_URL,
                    status_code=503,
                )


# For serving the dashboard
@app.get("/")
async def send_index(request: Request):
    return await send_frontend("/", request)


@app.get("/analysispage")
async def send_index_2(request: Request):
    return await send_frontend("/", request)


# For serving the dashboard assets
@app.get("/{path:path}")
async def send_supporting_elmt(path: str, request: Request):
    return await send_frontend(path, request)


if __name__ == "__main__":
    # Run DebiAI init
    # debiaiUtils.init()

    print("App running : http://localhost:{}".format(BACK_PORT))
    uvicorn.run("websrv:app", host="0.0.0.0", port=BACK_PORT, reload=True)

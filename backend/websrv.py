from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import Response, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import os
import requests
import uvicorn

# Import analysis functions
from src.analysis import ping, start

DEV_FRONTEND_URL = "http://localhost:8080/"
BACK_PORT = 3000

app = FastAPI(
    title="Factorio Blueprint Analyser",
    description="Factorio Blueprint Analyser backend API",
    version="1.3.1",
    contact={"email": "tomansion@yahoo.fr"},
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
)


# Pydantic models for request/response validation
class AnalysisParameters(BaseModel):
    inserterCapacityBonus: Optional[int] = Field(
        default=0, ge=0, le=7, description="The inserters capacity bonus"
    )


class AnalysisRequest(BaseModel):
    blueprint: str = Field(..., description="The blueprint string or json string")
    parameters: AnalysisParameters


class VersionResponse(BaseModel):
    version: str


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


# API endpoints
@app.get("/version", response_model=VersionResponse, tags=["General"])
async def get_version():
    """Ping to check if the backend is running and get version info"""
    version, status_code = ping()
    return {"version": version}


@app.post("/analysis", tags=["Analysis"])
async def analyze_blueprint(request_data: AnalysisRequest):
    """Start an analysis of a Factorio blueprint"""
    try:
        # Convert Pydantic model to dict format expected by analysis module
        data = {
            "blueprint": request_data.blueprint,
            "parameters": request_data.parameters.dict(),
        }
        result, status_code = start(data)

        if status_code == 200:
            return result
        else:
            raise HTTPException(status_code=status_code, detail=result)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Frontend serving routes
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

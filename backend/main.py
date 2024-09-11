from pathlib import Path

from config.env_config import environment_config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from transactions.controller import transaction_router


env_path = Path(".") / ".env"
# load_dotenv(dotenv_path=env_path)

ENV, CONFIG = environment_config()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app = FastAPI(
    title=CONFIG.get(ENV, "PROJECT_NAME"),
    version=CONFIG.get(ENV, "PROJECT_VERSION"),
    docs_url=CONFIG.get(ENV, "DOCS_URL"),
    redoc_url=CONFIG.get(ENV, "REDOC_URL"),
    openapi_url=CONFIG.get(ENV, "OPENAPI_URL"),
)


def register_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def include_router(app):
    app.include_router(transaction_router)


def start_application(app):
    include_router(app)
    # configure_static(app)
    register_cors(app)

    return app


fast_api = start_application(app)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")

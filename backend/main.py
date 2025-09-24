from fastapi import FastAPI
from pydantic import BaseModel
import httpx
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LMSTUDIO_API_URL = os.environ.get("LMSTUDIO_API_URL", "http://192.168.1.201:1234")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    payload = {
        "model": "microsoft/phi-4-mini-reasoning",
        "messages": [{"role": "user", "content": req.message}],
        "temperature": 0.7,
        "max_tokens": 200
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{LMSTUDIO_API_URL}/v1/chat/completions",
                json=payload,
                timeout=30
            )
        result = response.json()
        # Filter out <think> and only return the final answer
        content = result["choices"][0]["message"]["content"] if "choices" in result and len(result["choices"]) > 0 else ""
        # Remove <think> block if present
        if "<think>" in content:
            # Split on <think> and take everything after
            content = content.split("<think>")[-1].strip()
        # Optionally, take only the last paragraph as the answer
        paragraphs = [p.strip() for p in content.split("\n\n") if p.strip()]
        final_answer = paragraphs[-1] if paragraphs else content
        return {"response": final_answer}
    except Exception as e:
        return {"response": f"Exception: {str(e)}"}

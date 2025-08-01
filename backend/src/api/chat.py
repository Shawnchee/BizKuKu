from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from ..models.chat_model import ChatRequest
import logging
from pydantic import BaseModel
from ..services.chat import LLM

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

router = APIRouter()

headers = {"Cache-Control": "no-cache", "Connection": "keep-alive"}


@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        logger.info(f"Received request: {request}")

        # Costruct message history
        messages = [
            {'role': msg.role, 'parts': [{'text': msg.content}]}
            for msg in (request.message_history if request.message_history else [])
        ]
        # Add latest user message
        messages.append({'role': 'user', 'parts': [{'text': request.query}]})

        response = LLM.generate_response(
            messages=messages,
            agent_name="Chat",
        )

        return {"response": response}
    except Exception as e:
        logger.error(f"Error in processing chat: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/onboarding-chat")
async def onboarding_chat(request: ChatRequest):
    try:
        logger.info(f"Received request: {request}")

        # Costruct message history
        messages = [
            {'role': msg.role, 'parts': [{'text': msg.content}]}
            for msg in (request.message_history if request.message_history else [])
        ]
        # Add latest user message
        messages.append({'role': 'user', 'parts': [{'text': request.query}]})

        response = LLM.generate_response(
            messages=messages,
            agent_name="Onboarding",
        )

        return {"response": response}
    except Exception as e:
        logger.error(f"Error in processing chat: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
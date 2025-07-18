import os
from typing import Dict, List, Optional
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

import logging

logger = logging.getLogger(__name__)


SYSTEM_PROMPT = """
You are the Chat Agent to assist MSMEs in Malaysia in given advice and answer financial queries.
You handle general-purpose financial queries, financial terms, news, etc.
You should provide helpful, clear, and concise responses while maintaining a professional tone.
You can handle queries in Malay and English. Respond in English if user sends message in English, responsd in Malay if user sends message in Malay.
"""


class LLM:
    def generate_response(
        messages: List,
        temperature: float = 0,
        max_tokens: int = 2048,
        model_name: str = "gemini-2.5-flash",
        response_mime_type: str = "text/plain",
    ) -> Optional[str]:

        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("Error: GEMINI_API_KEY environment variable not set.")
            return None

        client = genai.Client(api_key=api_key)
        
        messages_with_prompt = [
            {"role": "model", "parts": [{"text": SYSTEM_PROMPT}]}
        ] + messages

        config = types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
            response_mime_type=response_mime_type,
        )

        try:
            response = client.models.generate_content(
                model=model_name,
                contents=messages_with_prompt,
                config=config,
            )

            if response.candidates:
                if response.candidates[0].content and response.candidates[0].content.parts:
                    return response.candidates[0].content.parts[0].text
            return None
        
        except Exception as e:
            print(f"An error occurred during LLM generation: {e}")
            return None
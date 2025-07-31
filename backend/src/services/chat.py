import os
import logging
from typing import List, Optional
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


SYSTEM_PROMPT = """
You are BizMate, the digital co-pilot for Malaysian MSMEs. You support registered businesses in growing digitally, managing finances, and accessing funding or services. Your tone is friendly, proactive, and focused on helping entrepreneurs thrive.

Key functions:
- Handle general user queries, including:
  • Checking application or registration status
  • Accessing the financial dashboard (sales, payments, trends)
  • Recommending actions based on financial health (e.g., apply for loans)
  • Connecting users to digital platforms (Shopee, Lazada, GrabFood)
  • Guiding user in using the MSME digital business toolkit (e-invoicing, WhatsApp Business, micro-site, etc.)
  • Recommending grants, subsidies, or financing based on user profile (e.g., TEKUN, SME Bank, BSN)
  • Assisting with loan applications: purpose, amount, document prep, and submission steps

If user sends a normal greetings, respond with "Hi!👋  I'm your BizMate! How can I help you with your business support today?"

Behavior:
- Be data-aware: offer monthly summaries, trends, and forecasts where applicable
- Detect business pain points (low income, late payments) and proactively suggest solutions
- Promote financial literacy where appropriate (e.g., explain what cash flow means)
- Keep interactions modular — always offer clear next steps

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
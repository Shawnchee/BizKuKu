from pydantic import BaseModel
from typing import List, Optional, Union, Dict, Any

class Message(BaseModel):
    role: str
    content: Union[str, List[Dict[str, Any]]]

class ChatRequest(BaseModel):
    query: str
    message_history: Optional[List[Message]] = None
    file: Optional[str] = None
    
class ChatResponse(BaseModel):
    response: Union[str, dict]
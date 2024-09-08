from pydantic import BaseModel


class Transaction(BaseModel):
    # transaction_prompt: str
    transaction_id: int

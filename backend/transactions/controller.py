from typing import List
from fastapi import APIRouter, HTTPException
from transactions import request_models as request
from transactions import response_models as response
from transactions import service as trans_service
from transactions import utils as trans_utils
from transactions import constants as trans_constants

transaction_router = APIRouter()


@transaction_router.post("/record-transaction/")
async def create_item(request_payload: request.Transaction):
    request_payload_dict = request_payload.model_dump()

    transaction_id = await trans_service.record_transaction_service(
        request_payload_dict
    )
    print("Response from service:", transaction_id)  # Debug output

    if transaction_id is None:
        raise HTTPException(status_code=404, detail="transaction_id not found")

    transaction = {"transaction_id": transaction_id}

    return trans_utils.create_response(
        trans_constants.SUCCESS_MESSAGE,
        trans_constants.SUCCESS_STATUS,
        trans_constants.USER_ID,
        transaction,
    )


@transaction_router.get("/transactions")
async def fetch_transactions():
    res = await trans_service.fetch_transactions_service()
    print("Response from service:", res)  # Debug output
    if res is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    transaction_list = [dict(record) for record in res]

    return trans_utils.create_response(
        trans_constants.SUCCESS_MESSAGE,
        trans_constants.SUCCESS_STATUS,
        trans_constants.USER_ID,
        transaction_list,
    )

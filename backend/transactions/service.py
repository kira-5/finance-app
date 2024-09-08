from transactions import data as trans_data


async def record_transaction_service(request_payload):
    return await trans_data.record_transaction_data(request_payload=request_payload)


async def fetch_transactions_service():
    return await trans_data.fetch_transactions_data()

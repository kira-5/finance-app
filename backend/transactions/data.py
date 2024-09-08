from db_connections import async_execute_query
from transactions import queries as trans_queries


async def record_transaction_data(request_payload):

    query = trans_queries.RECORD_TRANSACTION_QUERY
    print(query)
    transaction_id = await async_execute_query(query=query)

    return transaction_id[0].get("id") if transaction_id else None


async def fetch_transactions_data():

    query = "select id, name from users;"
    print(query)
    return await async_execute_query(query=query)

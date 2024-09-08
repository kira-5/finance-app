import psycopg2
import asyncpg
from config.env_config import environment_config


ENV, CONFIG = environment_config()

database = CONFIG.get(ENV, "DATABASE")
user = CONFIG.get(ENV, "USER")
password = CONFIG.get(ENV, "PASSWORD")
host = CONFIG.get(ENV, "HOST")
port = CONFIG.get(ENV, "PORT")


# Define connection parameters globally or pass as arguments if necessary
connection_params = {
    "database": database,
    "user": user,
    "password": password,
    "host": host,
    "port": port,
}


async def async_execute_query(query, params=None, fetch="all"):
    """
    Execute SQL query and perform the desired operation.

    :param query: The SQL query string (with placeholders if needed)
    :param params: Optional tuple/list of parameters to format the query
    :param fetch: 'all', 'one', 'none' (default is 'all')
                  - 'all': fetch all rows (for SELECT queries)
                  - 'one': fetch one row (for SELECT queries)
                  - 'none': no fetching (for INSERT/UPDATE/DELETE)

    :return: Fetched rows for SELECT queries; None for INSERT/UPDATE/DELETE
    """
    conn = None
    try:
        # Establish a database connection
        conn = await asyncpg.connect(**connection_params)

        # Handle SELECT queries with fetch options
        if fetch == "all":
            result = (
                await conn.fetch(query, *params) if params else await conn.fetch(query)
            )
        elif fetch == "one":
            result = (
                await conn.fetchrow(query, *params)
                if params
                else await conn.fetchrow(query)
            )
        else:
            # Execute for INSERT/UPDATE/DELETE (no fetching required)
            result = (
                await conn.execute(query, *params)
                if params
                else await conn.execute(query)
            )

        return result

    except Exception as e:
        print(f"Error executing query: {e}")
        return None

    finally:
        if conn:
            await conn.close()


def sync_execute_query(query, params=None, fetch="all"):
    """
    Execute SQL query and perform the desired operation.

    :param query: The SQL query string (with placeholders if needed)
    :param params: Optional tuple/list of parameters to format the query
    :param fetch: 'all', 'one', 'none' (default is 'all')
                  - 'all': fetch all rows (for SELECT queries)
                  - 'one': fetch one row (for SELECT queries)
                  - 'none': no fetching (for INSERT/UPDATE/DELETE)

    :return: Fetched rows for SELECT queries; None for INSERT/UPDATE/DELETE
    """
    try:
        # Establish a database connection
        with psycopg2.connect(**connection_params) as conn:
            with conn.cursor() as cursor:
                # Execute the query with optional parameters
                cursor.execute(query, params)

                # Commit changes for INSERT/UPDATE/DELETE queries
                if fetch == "none":
                    conn.commit()
                    return None

                # Fetch all or one row based on the fetch argument
                if fetch == "all":
                    return cursor.fetchall()
                elif fetch == "one":
                    return cursor.fetchone()

    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None

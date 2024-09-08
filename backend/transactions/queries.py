RECORD_TRANSACTION_QUERY = """
    INSERT INTO transactions (
        transaction_date, category, amount, tag, notes, created_by, created_at
    ) VALUES (
        '2024-09-08', 'Groceries', 100, 'Food', 'Weekly shopping', 1, NOW()
    )
    RETURNING id;
"""
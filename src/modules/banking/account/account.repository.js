function validateAccount({ userId, type, balance }) {
  if (!userId || typeof type !== 'string' || balance < 0) {
    throw new Error('Invalid account parameters');
  }
}

async function createAccount(data) {
  validateAccount(data);
  const result = await db.query(
    'INSERT INTO accounts (user_id, type, balance) VALUES ($1, $2, $3) RETURNING *',
    [data.userId, data.type, data.balance]
  );
  return result.rows[0];
}

function getAttributes(tableName) {
  var columnName = [];
  for (let key in tableName.rawAttributes) {
    if (
      key.localeCompare("createdAt") === -1 ||
      key.localeCompare("updateTimestamp") === -1
    ) {
      columnName.push(key);
    }
  }

  return columnName;
}

module.exports = { getAttributes };

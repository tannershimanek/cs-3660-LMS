const sanitize = (str) => {
  if (typeof str !== "undefined" && str !== null && str !== "null") {
    return str.trim();
  }
  return str;
};

const isValidColumn = (str) => {
  const validColumns = ["id", "image", "teamName", "numPlayers", "coach_id"];
  return validColumns.includes(str);
};

(module.exports = sanitize), isValidColumn;

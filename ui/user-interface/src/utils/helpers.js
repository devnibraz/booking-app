const getToken = () => localStorage.getItem("token");

const today = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const apiHeaders = () => ({
  headers: { Authorization: `Token ${localStorage.getItem("token")}` },
});

export { getToken, today, apiHeaders };


const useSearch = (data, value) => {
  if (value === " ") {
    return data;
  } else {
    const filteredData = data.filter(
      (item) =>
        item.status?.toLowerCase().includes(value) ||
        item.userName.toLowerCase().includes(value)
    );
    return filteredData;
  }
};
export default useSearch;

const fetchCollections = async () => {
  const response = await fetch("/api/collections");
  const data = await response.json();
  return data;
};

export default fetchCollections;

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search tickets..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded w-full"
    />
  );
};

export default SearchBar;
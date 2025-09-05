interface SearchBarProps {
    searchQuery: string,
    setSearchQuery: (query:string) => void,
}

export default function SearchBar({searchQuery,setSearchQuery}: SearchBarProps) {

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search for notes..."
        className="outline-none bg-blue-200 p-3 mb-6 flex-grow rounded-full placeholder-gray-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

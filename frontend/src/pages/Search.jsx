function Search() {
  return (
    <div className="search-page">

      <h1>Find a Contractor</h1>

      <div className="search-box">

        <select>
          <option>Project Type</option>
          <option>Kitchen Remodel</option>
          <option>Bathroom Remodel</option>
          <option>Roofing</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Painting</option>
          <option>Handyman</option>
        </select>

        <input
          type="text"
          placeholder="ZIP Code"
        />

        <select>
          <option>25 Miles</option>
          <option>10 Miles</option>
          <option>50 Miles</option>
        </select>

        <button>Search</button>

      </div>

    </div>
  );
}

export default Search;
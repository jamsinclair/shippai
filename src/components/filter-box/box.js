const html = require('choo/html')

const FilterBox = () => {
  return html`<details>
    <summary>Show filters</summary>
    <form>
      <label>
        Creator:
        <input type="text">
      </label>
      <label>
        Sort:
        <select>
          <option>Created</option>
          <option selected>Updated</option>
          <option>Popularity</option>
          <option>Long Running</option>
        </select>
      </label>
      <label>
        State:
        <select>
          <option selected>open</option>
          <option>closed</option>
          <option>all</option>
        </select>
      </label>
      Direction:
      <label>
        asc
        <input name="direction" value="asc" type="radio">
      </label>
      <label>
        desc
        <input name="direction" value="desc" type="radio">
      </label>
      <button>Update List</button>
    </form>
  </details>`
}

module.exports = FilterBox

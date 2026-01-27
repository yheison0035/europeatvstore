export function countActiveFilters(searchParams) {
  let count = 0;

  ["colors", "brands"].forEach((key) => {
    const value = searchParams.get(key);
    if (value) count += value.split(",").length;
  });

  if (searchParams.get("minPrice")) count += 1;
  if (searchParams.get("maxPrice")) count += 1;
  if (searchParams.get("sort")) count += 1;

  return count;
}

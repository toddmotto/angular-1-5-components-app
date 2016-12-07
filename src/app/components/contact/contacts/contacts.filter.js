export function contactsFilter() {
  return (collection, params) => collection.filter((item) => item.tag === (
    params.filter === 'none' ? item.tag : params.filter
  ));
}

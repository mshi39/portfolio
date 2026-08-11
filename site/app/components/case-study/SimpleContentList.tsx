export function SimpleContentList({ items }: { items: string[] }) {
  return <ul className="simple-list" data-component="SimpleContentList">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

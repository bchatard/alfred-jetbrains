import alfy from "alfy";

export function addTimeItem(items, title) {
  if (alfy.debug) {
    items.push({ title, icon: { path: alfy.icon.get("Clock") } });
  }
}

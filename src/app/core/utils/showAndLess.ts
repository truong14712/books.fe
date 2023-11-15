export function getDisplayedItems(showMoreContent: boolean, getAll: any[], showLessItemCount: number) {
  const shouldShowAllContent = showMoreContent;
  const displayedItems = shouldShowAllContent ? getAll : getAll?.slice(0, showLessItemCount);
  return displayedItems;
}

export function getRemainingItems(
  showMoreContent: boolean,
  showLessItemCount: number,
  getAll: any[],
  initialItemCount: number,
) {
  if (showMoreContent) {
    return [];
  } else {
    return getAll.slice(initialItemCount, initialItemCount + showLessItemCount);
  }
}

export function Selected(getAll: any[], data: any, Index: number) {
  const index = getAll.indexOf(data);
  return index === Index;
}

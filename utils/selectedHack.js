export function selectedClass(route, post) {
  const currentHash = route?.hash?.slice(1);
  const currentHref = route?.href?.slice(1).split('?')[0].split('/')[0];
  const currentPath = route?.fullPath?.slice(1).split('/')[0]
  const postPath = post._path.slice(1);

return [currentHash, currentHref, currentPath].includes(postPath)
};

export function selectedClassCard(route, post) {
  const currentHash = route?.hash?.slice(1);
  const currentHref = route?.href?.slice(1).split('?')[0].split('#')[0];
  const postPath = post._path.slice(1);

return currentHash === postPath || currentHref === postPath
};

export const borderClasses = (route, pathArr, index) => {
  const currentHash = route?.hash?.slice(1);
  const currentHref = route?.href?.slice(1).split('?')[0].split('/')[0];
  const currentPath = route?.fullPath?.slice(1).split('/')[0]

  return [currentHash, currentHref, currentPath].some(value => pathArr.indexOf(value) === index + 1);
};
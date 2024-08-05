export function selectedClass(route, post) {
  const currentHash = route.hash.slice(1);
  const currentHref = route.href.slice(1).split('?')[0];
  const postPath = post._path.slice(1);

  return currentHash === postPath || currentHref === postPath
};

export const borderClasses = (route, pathArr, index) => {
  const currentHash = route.hash.slice(1);
  const currentHref = route.href.slice(1).split('?')[0];

  return pathArr.indexOf(currentHash) === index + 1 ||
    pathArr.indexOf(currentHref) === index + 1
};
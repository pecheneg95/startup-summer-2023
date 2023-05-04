const getLocalStorageFavorites = () => {
  if (localStorage.getItem('favorites') !== null) {
    return JSON.parse(localStorage.getItem('favorites') as string).map(
      (el: string) => Number(el)
    ) as number[];
  }

  return null;
};

const setLocalStorageFavorite = (id: number) => {
  const favorites = getLocalStorageFavorites();

  if (favorites !== null) {
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    localStorage.setItem('favorites', JSON.stringify([id]));
  }
};

const deleteLocalStorageFavorite = (id: number) => {
  const favorites = getLocalStorageFavorites();

  if (favorites !== null && favorites.includes(id)) {
    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites.filter((el) => el !== id))
    );
  }
};

const isLocalStorageFavorite = (id: number) => {
  const favorites = getLocalStorageFavorites();

  if (favorites !== null) {
    return favorites.includes(id);
  }

  return false;
};

export {
  getLocalStorageFavorites,
  setLocalStorageFavorite,
  deleteLocalStorageFavorite,
  isLocalStorageFavorite,
};

const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');

  if (favorites !== null) {
    return JSON.parse(favorites).map((el: string) => Number(el)) as number[];
  }

  return null;
};

const addFavorite = (id: number) => {
  const favorites = getFavorites();

  if (favorites === null) {
    localStorage.setItem('favorites', JSON.stringify([id]));
    return;
  }

  favorites.push(id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const deleteFavorite = (id: number) => {
  const favorites = getFavorites();

  if (favorites !== null && favorites.includes(id)) {
    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites.filter((el) => el !== id))
    );
  }
};

const isFavorite = (id: number) => {
  const favorites = getFavorites();

  if (favorites !== null) {
    return favorites.includes(id);
  }

  return false;
};

export { getFavorites, addFavorite, deleteFavorite, isFavorite };

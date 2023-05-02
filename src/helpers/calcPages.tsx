const REPOS_ON_PAGE = 4;
const API_MAX_TOTAL = 500;

const calcPages = (totalPages: number) => {
  return Math.ceil(
    totalPages > API_MAX_TOTAL
      ? API_MAX_TOTAL / REPOS_ON_PAGE
      : totalPages / REPOS_ON_PAGE
  );
};

export default calcPages;

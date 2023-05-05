import DOMPurify from 'dompurify';

import { Vacancy } from 'types/types';

const createMarkup = (vacancy: Vacancy) => {
  if (vacancy) {
    return DOMPurify.sanitize(vacancy.vacancyRichText) as string | TrustedHTML;
  }

  return '';
};

export default createMarkup;

import DOMPurify from 'dompurify';
import { Vacancy } from '../types/types';

const createMarkup = (vacancy: Vacancy) => {
  if (vacancy) {
    const clean = DOMPurify.sanitize(vacancy.vacancyRichText);

    return { __html: clean };
  }
};

export default createMarkup;

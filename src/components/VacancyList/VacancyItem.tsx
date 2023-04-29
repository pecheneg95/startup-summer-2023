import React, { useCallback, useState } from "react"
import { Link } from "react-router-dom";
import classNames from 'classnames';

import LocationIcon from "../Icons/Location/LocationIcon"
import StarIcon from "../Icons/Star/StarIcon"

import { setLocalStorageFavorite, deleteLocalStorageFavorite, isLocalStorageFavorite } from "../../services/favorites";
import formatSalary from "../../helpers/formatSalary"

import { Vacancy } from "../../types/types";

import styles from "./VacancyItem.module.scss"

const VacancyItem = ({ content }: { content: Vacancy }) => {
  const [isInFavorite, setInFavorite] = useState(isLocalStorageFavorite(content.id))
  const toggleFavorite = useCallback(() => {
    isInFavorite ? deleteLocalStorageFavorite(content.id) : setLocalStorageFavorite(content.id)
    setInFavorite(!isInFavorite)
  }, [content.id, isInFavorite])

  return (
    <li className={styles.listItem} data-elem={`vacancy-${content.id}`}>
      <Link to={`/vacancies/${content.id}`} className={styles.routeLink}>
        <h3 className={styles.header}>{content.profession}</h3>
      </Link>
      <div className={styles.subtitle}>
        <span className={styles.salary}>{formatSalary(content)}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.time}>{content.type_of_work.title}</span>
      </div>
      <div className={styles.location}>
        <LocationIcon color="#ACADB9" />
        <span className={styles.locationText}>{content.town.title}</span>
      </div>
      <div className={!!isInFavorite ? classNames(styles.active, styles.favorite) : styles.favorite} onClick={toggleFavorite}>
        <StarIcon color='none' data-elem={`vacancy-${content.id}-shortlist-button`} />
      </div>
    </li >

  )
}

export default React.memo(VacancyItem)
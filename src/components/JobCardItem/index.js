import {Link} from 'react-router-dom'

import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobCardItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    id,
    employementType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item

  return (
    <>
      <Link to={`/jobs/${id}`} className="link">
        <li className="list">
          <div className="first-container">
            <div className="title-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="company logo"
              />
              <div className="rating-container">
                <h1 className="heading">{title}</h1>
                <div className="star-rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="paragraph">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-typr-container">
                <div className="location-rating-container">
                  <MdLocationOn className="location-on" />
                  <p className="paragraph">{location}</p>
                </div>
                <div className="employement-type-container">
                  <p className="paragraph">{employementType}</p>
                </div>
              </div>
            </div>
            <p className="paragraph">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="second-container">
            <h1 className="heading">Description</h1>
            <p className="paragraph">{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default JobCardItem

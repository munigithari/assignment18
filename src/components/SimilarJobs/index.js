import {MdLocationOn} from 'react-icons/md'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobs = props => {
  const {similarJobData} = props
  const {
    companyLogoUrl,
    jobDescription,
    rating,
    title,
    location,
    employementType,
  } = similarJobData

  console.log(similarJobData)

  return (
    <li className="lis">
      <div className="title-container">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="rating-container">
          <h1 className="heading">{title}</h1>
          <div className="star-rating-container">
            <AiFillStar className="star" />
            <p className="paragraph">{rating}</p>
          </div>
        </div>
      </div>
      <div className="second-container">
        <h1 className="heading">Description</h1>
        <p className="paragraph">{jobDescription}</p>
      </div>
      <div className="location-job-details-container-list">
        <div className="icon-container">
          <MdLocationOn className="location" />
          <p className="paragraph">{location}</p>
        </div>
      </div>
      <div className="employeement-container">
        <p className="pargarph">{employementType}</p>
      </div>
    </li>
  )
}

export default SimilarJobs

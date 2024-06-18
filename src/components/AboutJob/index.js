import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJob extends Component {
  state = {
    jobDetails: [],
    similarJobData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_Token')
    const apiUrlData = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authenticattion: `Bearer  ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrlData, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = [fetchedData.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employementType: eachItem.employement_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_job_company.description,
          imageUrl: eachItem.life_at_comapny.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkills => ({
          imageUrl: eachSkills.image_url,
          name: eachSkills.name,
        })),
        title: eachItem.title,
      }))

      const updatedSmiliarData = fetchedData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        employementType: eachItem.employement_type,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetails: updatedData,
        similarJobData: updatedSmiliarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderingSuccessView = () => {
    const {jobDetails, similarJobData} = this.state
    if (jobDetails.length > 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        location,
        rating,
        employementType,
        jobDescription,
        lifeAtCompany,
        skills,
        packagePerAnnum,
        title,
      } = jobDetails[0]

      return (
        <>
          <div className="job-container">
            <div className="first_container">
              <div className="image-containner">
                <img
                  src={companyLogoUrl}
                  className="company-logo"
                  alt="job details company logo"
                />
                <div className="title-container">
                  <h1 className="heading">{title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="icon" />
                    <p className="paragraph">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location_container">
                <div className="job-container">
                  <div className="location-container">
                    <MdLocationOn className="icon" />
                    <p className="paragraph">{location}</p>
                  </div>
                  <div className="mini-container">
                    <p className="paragraph">{employementType}</p>
                  </div>
                </div>
                <div className="mini-container">
                  <p className="paragraph">{packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr className="line" />
            <div className="second-container">
              <div className="mini-container">
                <h1 className="heading">Description</h1>
                <a href={companyWebsiteUrl} className="image8">
                  Visit <BiLinkExternal />
                </a>
              </div>
              <p className="paragraph">{jobDescription}</p>
            </div>
            <h1>Skills</h1>
            <ul className="list-container">
              {skills.map(eachItem => (
                <li className="list" key={eachItem.id}>
                  <img
                    src={eachItem.imageUrl}
                    className="skill-image"
                    alt={eachItem.name}
                  />
                  <p className="paragraph">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-life-image-container">
              <div className="life-heading-para-container">
                <h1>Life At Company</h1>
                <p className="paragraph">{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <h1 className="heading">Similar jobs</h1>
          <ul className="list-item">
            {similarJobData.map(eachJob => (
              <SimilarJobs
                key={eachJob.id}
                employementType={employementType}
                similarJobData={eachJob}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  onRetryJobDetailsAgain = () => {
    this.getJobs()
  }

  renderingFailureView = () => (
    <div className="failure-view-container">
      <img src="" alt="failure view" />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="paragraph">
        we cannot see to find page you are looking for.{' '}
      </p>
      <div className="btin-container">
        <button
          className="button1"
          type="button"
          onClick={this.onRetryJobDetailsAgain}
        >
          retry
        </button>
      </div>
    </div>
  )

  renderingLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderingJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingSuccessView()
      case apiStatusConstants.failure:
        return this.renderingFailureViewView()
      case apiStatusConstants.inProgress:
        return this.renderingLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">
          {this.renderingJobDetails()}
        </div>
      </>
    )
  }
}

export default AboutJob

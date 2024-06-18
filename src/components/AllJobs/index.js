import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCardItem from '../JobCardItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    jobsData: [],
    profileData: {},
    activeCheckedList: [],
    activeSalaryRangeId: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    apiJobStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_Token')
    const url = `https://apis.ccbp.in/profile`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const profile = data.profile_details
      const updatedProfileData = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }

      console.log(updatedProfileData)

      this.setState({
        profileData: updatedProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeCheckedList, activeSalaryRangeId, searchInput} = this.state

    const type = activeCheckedList.join(',')
    const jwtToken = Cookies.get('jwt_Token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const filteredJobsList = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company.logo_url,
        employementType: each.employement_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(filteredJobsList)

      this.setState({
        jobsData: filteredJobsList,
        apiJobStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.getJobsData()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  onSelectSalary = event => {
    this.setState({activeSalaryRangeId: event.target.id}, this.getJobsData)
  }

  onClickCkeckBox = event => {
    const {activeCheckedList} = this.state
    if (activeCheckedList.includes(event.target.id)) {
      const updatedList = activeCheckedList.filter(
        each => each !== event.target.id,
      )
      this.setState({activeCheckedList: updatedList}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          activeCheckedList: [...prevState.activeCheckedList, event.target.id],
        }),
        this.getJobsData,
      )
    }
  }

  onSuccessProfileView = () => {
    const {jobsData} = this.state
    const noOfJobs = jobsData.length > 0
    return noOfJobs ? (
      <>
        <ul className="list-item">
          {jobsData.map(each => (
            <JobCardItem key={each.id} item={each} />
          ))}
        </ul>
      </>
    ) : (
      <div className="jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no_job_image"
          alt="no jobs"
        />
        <h1 className="heading">No Jobs Found</h1>
        <p className="paragraph">
          we could not find any jobs, Try others filters.
        </p>
      </div>
    )
  }

  onRetryProfile = () => this.getProfileData()

  onRetryJobs = () => this.getJobsData()

  onFailProfileView = () => {
    ;<>
      <h1>Profile Fail</h1>
      <button type="button" className="button1" onClick={this.onRetryProfile}>
        Retry
      </button>
    </>
  }

  onFailJobsView = () => {
    ;<>
      <div className="mini-container99">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="image420"
          alt="failure view"
        />
        <h1 className="heading">Oop! Something Went Wrong</h1>
        <p className="paragraph">
          we cannot seen to find the page you are looking for{' '}
        </p>
        <div className="btn-container">
          <button type="button" className="button1" onClick={this.onRetryJobs}>
            retry
          </button>
        </div>
      </div>
    </>
  }

  onLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onGetCkeckboxView = () => {
    ;<ul className="list-item">
      {employmentTypesList.map(eachItem => (
        <li className="list" key={eachItem.employmentTypeId}>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="ckeckbox"
            onChange={this.onClickCkeckBox}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  }

  onGetRadioButtonView = () => {
    ;<>
      <ul className="list-item">
        {salaryRangesList.map(eachItem => (
          <li className="list" key={eachItem.salaryRangeId}>
            <input
              className="input"
              id={eachItem.salaryRangeId}
              type="ckeckbox"
              onChange={this.onSelectSalary}
            />
            <label className="label" htmlFor={eachItem.salaryRangeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  }

  onRenderingProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onSuccessProfileView()
      case apiStatusConstants.failure:
        return this.onFailJobsView()
      case apiStatusConstants.inProgress:
        return this.onLoading()
      default:
        return null
    }
  }

  onRenderSearch = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          className="input"
          value={searchInput}
          type="search"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          className="button1"
          aria-label="save"
          type="button"
          data-testid="searchButton"
          onClick={this.onSubmitSearchInput}
        >
          <AiOutlineSearch className="icon" />
        </button>
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="body-container">
          <div className="search-container">{}this.onRenderSearch()</div>
          <div className="side-bar-container">
            {this.onRenderingProfile()}
            <hr className="line" />
            <h1 className="heading">Type of Employment</h1>
            {this.onGetCkeckboxView()}
            <hr className="line" />
            <h1 className="heading">Salary Range</h1>
            {this.onGetRadioButtonView()}
          </div>
          <div className="jobs-container">
            <div className="search-container">{this.onRenderSearch()}</div>
            {this.onRenderingProfile()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs

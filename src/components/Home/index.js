import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="container-home">
    <Header />
    <h1 className="heading11">Find The Job That Fits Your Life</h1>
    <p className="paragraph12">
      Millions of people searching fro jobs, salary, information, company
      reviews.Find the job that fits your ability and potential.
    </p>
    <Link to="/jobs">
      <button type="button" className="button13">
        Find Jobs
      </button>
    </Link>
  </div>
)

export default Home

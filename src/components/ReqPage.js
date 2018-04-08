import React, {Component} from 'react'
import ReqForm from './ReqForm'

class ReqPage extends Component {
    render() {
        return(
            <div className='widget-page'>
                <h3>You're logged on!!</h3>
                <p>Enter you Requested input to begin!</p>
                <ReqForm />
            </div>

        )
    }
}

export default ReqPage
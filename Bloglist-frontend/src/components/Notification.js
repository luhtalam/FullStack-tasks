import React from 'react'
import { connect} from 'react-redux' 
import './Notification.css'

class Notification extends React.Component {
  render() {
    const notification = this.props.notification
    if (notification) {
      return (
        <div className='notification'>
          {this.props.notification}
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
import React from 'react';
import { Session } from 'meteor/session';
import { Tracker} from 'meteor/tracker';

export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    }
  }
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      // const showVisible = Session.get('showVisible');
      // this.setState({ showVisible: showVisible });

      // Or we can do the next thing:
      this.setState({
        showVisible: Session.get('showVisible')
      })
    })
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  render () {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
            // console.log(e.target.checked);
            // if (e.target.checked) {
            //   Session.set('showVisible', false)
            // } else {
            //   Session.set('showVisible', true);
            // }
            Session.set('showVisible', !e.target.checked);
          }}/>
          Show hidden links
        </label>
      </div>
    )
  }
}

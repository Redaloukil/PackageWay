import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  DASHBORD_PAGE_LOADED,
  DASHBORD_PAGE_UNLOADED
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
    packages : state.requestsList.requests,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: DASHBORD_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: DASHBORD_PAGE_UNLOADED })
});

class RequestsList extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Helps.all());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    // if (!props.packages) {
    //     return (
    //       <div className="article-preview">Loading...</div>
    //     );
    //   }
    // if (props.packages.length === 0) {
    //     return (
    //       <div className="article-preview">
    //         No requests are created here... yet.
    //       </div>
    //     );
    // }
    return (
        <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">Content Type</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
        </table>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsList);

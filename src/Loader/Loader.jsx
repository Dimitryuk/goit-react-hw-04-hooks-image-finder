

import { Component } from "react";
import Loader from "react-loader-spinner";
export default class AppLoader extends Component {
  //other logic
  render() {
    return (
      <Loader className='loader'
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={300} //3 secs
      />
    );
  }
}
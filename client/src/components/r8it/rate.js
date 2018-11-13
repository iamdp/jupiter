import React from "react";
import axios from "axios";
import "./challenge.css";

class Challenge extends React.Component {
  state = { user: "anon" };

  componentDidMount() {
    axios.get("/api/getComparables").then(response => {
      console.log(response.data);
      this.setState(response.data);
    });
  }

  handleClick = event => {
    // Assign the userId here once feature if available
    let userId = this.state.userId
      ? this.state.userId
      : "5be04cee9971c8c18da3c1cc";

    axios({
      method: "POST",
      url: "/api/saveResult",
      data: {
        challenger: event.target.getAttribute("data-challenger"),
        challengee: event.target.getAttribute("data-challengee"),
        userId
      }
    }).then(response => {
      console.log(response);
      axios.get("/api/getComparables").then(response => {
        this.setState(response.data);
      });
    });
  };

  render() {
    if (!this.state.challenge) {
      return (
        <div className="alert alert-primary" role="alert">
          <p>Hold on a moment, while we sort through out posts.</p>
        </div>
      );
    } else if (!this.state.posts || this.state.posts.length <= 1) {
      return (
        <div className="alert alert-danger" role="alert">
          <p>
            The {this.state.challenge.verb} {this.state.challenge.noun} has less
            than two posts.
          </p>
          <p>
            Contribute to this challenge category by clicking{" "}
            <button>here</button> or
          </p>
          <p>
            Click <button onClick={this.handleClick}>here</button> for another
            random challenge cateogry.
          </p>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row text-center">
            <h1 className="col-12">
              Which {this.state.challenge.noun} is the{" "}
              {this.state.challenge.verb}?
            </h1>
          </div>
          <div className="row justify-content-center">
            <img
              className="col-12 col-md-6"
              alt={this.state.posts[0].title}
              data-challenger={this.state.posts[1]._id}
              data-challengee={this.state.posts[0]._id}
              onClick={this.handleClick}
              src={
                "http://res.cloudinary.com/r8te/image/upload/bo_2px_solid_rgb:000000,c_fill,f_webp,fl_awebp,g_center,h_412,q_auto,w_400/" +
                this.state.posts[1].cloudinaryRef
              }
            />
            <img
              className="col-12 col-md-6"
              data-challenger={this.state.posts[0]._id}
              data-challengee={this.state.posts[1]._id}
              onClick={this.handleClick}
              alt={this.state.posts[1].title}
              src={
                "http://res.cloudinary.com/r8te/image/upload/bo_2px_solid_rgb:000000,c_fill,f_webp,fl_awebp,g_center,h_412,q_auto,w_400/" +
                this.state.posts[0].cloudinaryRef
              }
            />
          </div>
        </div>
      );
    }
  }
}

export default Challenge;

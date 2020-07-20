import React from "react";
import axios from "axios";

function postsData(WrappedComponent) {
  return class PP extends React.Component {
    
   state = {
      posts: [],

    };
    componentDidMount() {
      this.fetchPosts();
      
    }
    async fetchPosts() {
      let postsData = {
        method: "GET",
        url: `https://striveschool.herokuapp.com/api/posts/`,
        headers: {
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        },
      };
      let posts = await axios(postsData);
      this.setState({ posts : posts.data.reverse().slice(0,20) });
    }
    render() {
      return <WrappedComponent posts={this.state.posts} />;
    }
  };
}
export default postsData;


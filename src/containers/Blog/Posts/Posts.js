import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";

// import { Link } from "react-router-dom";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(80, 84);
        const updatedPost = posts.map(post => {
          return {
            ...post,
            author: "- Zakwan"
          };
        });
        this.setState({ posts: updatedPost });
        // console.log(response);
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error);
      });
  }

  postSelectedHandler = id => {
    // this.setState({ selectedPostId: id });
    this.props.history.push({ pathname: "/" + id });
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          //   <Link to={"/" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          //   </Link>
        );
      });
    }

    return (
      <div>
        {/* <section>
          <FullPost id={this.state.selectedPostId} />
        </section> */}

        <section className="Posts">{posts}</section>
      </div>
    );
  }
}

export default Posts;

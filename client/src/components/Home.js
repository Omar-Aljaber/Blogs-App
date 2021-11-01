import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            error: '',
        };
    }
    
    // Get the Titles of all Blogs
    componentDidMount() {
        axios.get('/api/posts').then((res) => {
            this.setState({
                posts: res.data,
                error: '',
            });
        });
    }

    render() {
        if (this.state.posts.length < 1) {
            return <h4>There are no Blogs to display</h4>;
        }
        return this.state.posts.map((post) => {
            return (
                <div key={post._id} className="row">
                    <div className="column">
                        <h4 className="title">{post.title}</h4>
                        <h6 className="author">
                            {'Author: ' + post.author.name}
                        </h6>
                        <p className="content">{post.content.substr(0, 120)}</p>
                        <Link to={'/view_post/' + post._id}>Read more...</Link>
                        <hr />
                    </div>
                </div>
            );
        });
    }
}

export default Home;

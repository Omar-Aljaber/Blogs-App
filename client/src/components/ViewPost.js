import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.actionsRender = this.actionsRender.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.commentsRender = this.commentsRender.bind(this);
        this.commentsForm = this.commentsForm.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            post: {},
            comment: '',
            commentError: '',
            error: '',
        };
    }

    // Delete and Edit buttons
    actionsRender() {
        if (localStorage.getItem('_id') === this.state.post.author._id) {
            return (
                <span>
                    <Link to={'/edit_post/' + this.state.post._id}>
                        <button className="button-outline">Update</button>
                    </Link>
                    <button
                        className="button-outline"
                        onClick={this.deleteHandler}
                    >
                        Delete
                    </button>
                </span>
            );
        }
    }

    // Delete handler
    deleteHandler() {
        const postId = this.props.match.params.id;
        axios
            .delete('/api/posts/' + postId)
            .then((res) => {
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({
                    error: <blockquote>{err.response.data.message}</blockquote>,
                });
            });
    }

    // Get Comment
    changeComment(e) {
        this.setState({
            comment: e.target.value,
            commentError: '',
        });
    }

    // Send a Comment
    onSubmit(e) {
        e.preventDefault();
        if (!this.state.comment) {
            return this.setState({
                commentError: (
                    <blockquote>
                        Attention: You should fill the Comment field!
                    </blockquote>
                ),
            });
        }
        const postId = this.props.match.params.id;
        const data = { content: this.state.comment };
        axios
            .post('/api/comments/' + postId, data)
            .then((res) => {
                const post = this.state.post;
                post.comments.push({
                    _id: res.data._id,
                    comment: res.data.comment,
                    author: res.data.author,
                });
                this.setState({
                    post: post,
                    comment: '',
                    commentError: '',
                });
            })
            .catch((err) => {
                this.setState({
                    commentError: (
                        <blockquote>{err.response.data.message}</blockquote>
                    ),
                });
            });
    }

    commentsForm() {
        return (
            <div>
                <h6>
                    <strong>Write Your comment</strong>
                </h6>
                {this.state.commentError}
                <form onSubmit={this.onSubmit}>
                    <textarea
                        value={this.state.comment}
                        onChange={this.changeComment}
                    />
                    <input type="submit" value="Comment" />
                </form>
            </div>
        );
    }

    commentsRender() {
        if (!this.state.post.comments.length) {
            return <p>There are no comments to display</p>;
        }
        return this.state.post.comments.map((comment) => {
            return (
                <p key={comment._id}>
                    {localStorage.getItem('_id') === comment.author._id
                        ? 'You: ' + comment.comment
                        : comment.author.name + ': ' + comment.comment}
                </p>
            );
        });
    }

    // Get details of the Blog
    componentDidMount() {
        const postId = this.props.match.params.id;
        axios
            .get('/api/posts/' + postId)
            .then((res) => {
                this.setState({
                    post: res.data,
                    commentError: '',
                    error: '',
                });
            })
            .catch((err) => {
                this.setState({
                    error: <blockquote>{err.response.data.message}</blockquote>,
                });
            });
    }

    render() {
        if (!this.state.post.title) {
            return <h4>Please wait...</h4>;
        }
        return (
            <div className="row">
                <div className="column">
                    <h4 className="title">
                        <strong>{this.state.post.title}</strong>
                    </h4>
                    {this.state.error}
                    <h6 className="author">
                        {'Author: ' + this.state.post.author.name}
                    </h6>
                    <p className="content">{this.state.post.content}</p>
                    {this.actionsRender()}
                    <hr />
                    <h6>
                        <strong>Comments</strong>
                    </h6>
                    {this.commentsRender()}
                    <hr />
                    {this.commentsForm()}
                </div>
            </div>
        );
    }
}

export default ViewPost;

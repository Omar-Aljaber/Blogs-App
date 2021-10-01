import React from 'react';
import axios from 'axios';

class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title: '',
            content: '',
            error: '',
        };
    }

    changeTitle(e) {
        this.setState({
            title: e.target.value,
            error: '',
        });
    }

    changeContent(e) {
        this.setState({
            content: e.target.value,
            error: '',
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.state.title) {
            return this.setState({
                error: (
                    <blockquote>
                        Attention: You should fill the <strong>Title </strong>
                        field!
                    </blockquote>
                ),
            });
        }
        if (!this.state.content) {
            return this.setState({
                error: (
                    <blockquote>
                        Attention: You should fill the <strong>Content </strong>
                        field!
                    </blockquote>
                ),
            });
        }
        const postId = this.props.match.params.id;
        const data = {
            title: this.state.title,
            content: this.state.content,
        };
        axios
            .put('/api/posts/' + postId, data)
            .then((res) => {
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({
                    error: <blockquote>{err.response.data.message}</blockquote>,
                });
            });
    }

    componentDidMount() {
        const postId = this.props.match.params.id;
        axios
            .get('/api/posts/' + postId)
            .then((res) => {
                this.setState({
                    title: res.data.title,
                    content: res.data.content,
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
        return (
            <div>
                <h2 className="edit_post">Edit the Post</h2>
                {this.state.error}
                <form onSubmit={this.onSubmit}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.changeTitle}
                    />
                    <label>Content</label>
                    <textarea
                        value={this.state.content}
                        onChange={this.changeContent}
                    />
                    <input type="submit" value="Update" />
                </form>
            </div>
        );
    }
}

export default EditPost;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchPost } from '../actions';


class PostsShow extends Component {
	componentDidMount() {		
		if (!this.props.post) {
			this.props.fetchPost(this.props.match.params.id);
		}
	}
	render() {
		if (!this.props.post) {
			return <p>Loading...</p>;
		} 
		return (
			<div>
				<div className="post-item">
					<h3>{this.props.post.title.charAt(0).toUpperCase() + this.props.post.title.slice(1)}</h3>
					<p>{this.props.post.content.charAt(0).toUpperCase() + this.props.post.content.slice(1)}</p>
				</div>
				<Link to="/">
					Back 
				</Link>
			</div>
		);
	}
}
function mapStateToProps(state, ownProps) {
	const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL 
	const post = state.posts.find(p => p.id === idFromUrl);
	return { post };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchPost }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
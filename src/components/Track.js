import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router';

import Item from './Item';
import { pluralize, isNumber, decode, getSource } from '../utils/utils';
import { SEPARATOR } from '../config';
import Icon from './Icon';


export default class Tracks extends Component {
  static propTypes = {
    post: PropTypes.object,
    onPlay: PropTypes.func,
    playing: PropTypes.bool,
    showSubreddit: PropTypes.bool,
    showThumb: PropTypes.bool  // not tested
  };
  shouldComponentUpdate(nextProps) {
    return (
      this.props.post.id !== nextProps.post.id ||
      this.props.playing !== nextProps.playing
    );
  }
  onPlay = () => this.props.onPlay(this.props.post);
  onLinkClick(e) {
    // Prevent playing media on link click
    e.stopPropagation();
  }
  renderTime({ created }) {
    return (
      <TimeAgo
        key="time"
        date={created}
        component="time"
        dateTime={created.toISOString()}
        title={created.toString()}
      />
    );
  }
  renderComments({ permalink, num_comments, author }) {
    return (
      <a key="comments" onClick={this.onLinkClick} href={permalink} target="_blank" title="View source on Reddit">
        {isNumber(num_comments) ? pluralize(num_comments, 'comment') : '0 comments'}
      </a>
    );
  }
  renderSubreddit({ subreddit }) {
    return (
      <Link key="subreddit" onClick={this.onLinkClick} to={'/r/' + subreddit} title="View source on Reddit">
        {subreddit}
      </Link>
    );
  }

  renderSource({ url }) {
    const source = getSource(url);
    let viewBox = "0 0 24 24"
    if (source === 'soundcloud') {
        viewBox = "0 -5 24 24"  // needs shifting
    }
    return (
      <a key="source" onClick={this.onLinkClick} href={url} target="_blank" title={source}>
        <Icon icon={source} viewBox={viewBox} />
      </a>
    );
  }
  renderMeta(post) {
    let nodes = [
      this.renderSource(post), SEPARATOR,
      this.renderTime(post), SEPARATOR,
      this.renderComments(post)
    ];
    if (this.props.showSubreddit) {
      nodes = nodes.concat(SEPARATOR, this.renderSubreddit(post));
    }
    return nodes;
  }
  getThumb(thumb) {
    thumb = thumb || 'color'
    if (this.props.showThumb) {
      thumb == null
    }
    return thumb
  }

  render() {
    const { post, playing } = this.props;
    return (
      <Item
        onClick={this.onPlay}
        thumbnail={this.getThumb(post.thumbnail)}
        title={decode(post.title)}
        meta={this.renderMeta(post)}
        active={playing}
      />
    );
  }
}

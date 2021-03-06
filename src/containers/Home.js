import React, { Component } from 'react';

import classNames from '../styles/containers/Home.scss';
import playlists from '../../data/playlists.json';
import TopThreads from '../components/TopThreads';
import Item from '../components/Item';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Header from '../components/Header';

import {Link} from 'react-router';
import { pluralize } from '../utils/utils';
import { APP_NAME, APP_TAGLINE, SEPARATOR } from '../config';

export default class Home extends Component {

  state = {
    limitSubs: 27,
    limitGenres: 30,
    searchTerm: '',
  };

  componentDidMount() {
    document.title = `${APP_NAME}${SEPARATOR}home`;
  }

  onChangeSearch = (e) => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  filterSubreddit = ({ name }) => {
    const { searchTerm } = this.state;
    if (searchTerm.length > 1) {
      return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }
    return true;
  };

  renderMulti({ path, name, description, subscribers }) {
    return (
      <Item
        key={path}
        href={path}
        title={name}
        meta={description}
        thumbnail={'small'}
        hoverText={name + ': ' +  subscribers+ ' subscribers'}
      />
    );
  }

  renderSubreddit({ name, subscribers }) {
    // meta={pluralize(subscribers, 'subscriber')}
    return (
      <Item
        key={name}
        href={'/r/' + name}
        title={name}
        thumbnail={'small'}
        hoverText={name + ': ' +  subscribers+ ' subscribers'}
      />
    );
  }

  renderSearch(searchTerm) {
    return (
      <section className={classNames.search}>
        <Icon icon="search" className={classNames.searchIcon} />
        <input
          type="text"
          value={searchTerm}
          onChange={this.onChangeSearch}
          placeholder="search playlists"
        />
        {searchTerm &&
          <button onClick={() => this.setState({ searchTerm: '' })} className={classNames.clearSearch}>
            <Icon icon="clear" />
          </button>
        }
      </section>
    );
  }


  render() {
    document.body.style.overflow = 'auto';
    const { limitSubs, limitGenres, searchTerm } = this.state;
    const subreddits = playlists.subreddits.filter(this.filterSubreddit);
    const header = (
			<div>
				<Header home={true}/>
			</div>
		);

    return (
      <section className={classNames.home}>
          {header}
        <h2>
          <Icon icon="playlist" />
          Playlists
        </h2>
        {this.renderSearch(searchTerm)}
        <ul className={classNames.subreddits}>
          {subreddits
              .slice(0, limitSubs)
              .map(this.renderSubreddit)
          }
          {subreddits.length === 0 &&
            <li>no subreddits found</li>
          }
        </ul>
        {subreddits.length > limitSubs &&
          <Button onClick={() => this.setState({ limitSubs: limitSubs + 15 })}>
            Show more
          </Button>
        }

        <h2>
          <Icon icon="threads" />
          Threads
        </h2>
        <TopThreads />

        <h2>
          <Icon icon="genres" />
          Genres
        </h2>
        <ul className={classNames.genres}>
          {playlists.genres.slice(0, limitGenres).map(this.renderMulti)}
        </ul>
        {playlists.genres.length > limitGenres &&
          <Button onClick={() => this.setState({ limitGenres: playlists.genres.length })}>
            Show all
          </Button>
        }

        <h2>
          <Icon icon="discover" />
          Discover
        </h2>
        {playlists.discover.map(this.renderMulti)}
      </section>
    );
  }
}

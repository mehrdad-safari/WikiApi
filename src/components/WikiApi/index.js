import React, { Component } from 'react';

import Loader from './Loader/loader';
import DropDown from './Dropdown/dropdown';

// Helpers
import fetchApi from './helpers/api';
import userBrowserLang from './helpers/lang';

import './assets/style/main.css';
import './assets/style/wikipedia.css';

export default class WikiApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wikiData: null,
      langList: [],
      defLang: 'en',
      isLoading: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    const pageTitle = this.props.keyword || 'Albert_Einstein';
    // Inistial data loading with user Browser language
    if (this.props.locale) {
      this.getData(this.props.locale, pageTitle);
    } else {
      this.getData(userBrowserLang(), pageTitle);
    }
  }

  /**
   *  Redirection all content link to original Wikipedia Website
   * @param {obj} event - Event from clicked achor links .
   */
  redirectLinks = (e) => {
    e.preventDefault();
    window.open(
      `https://${this.state.defLang}.wikipedia.org${e.target.getAttribute(
        'href'
      )}`,
      '_blank'
    );
  };

  handleSelect = (e) => {
    if (e.target) {
      const userLang = e.target.getAttribute('data-lang');
      const pageTitle = e.target.getAttribute('data-title');
      const langAutonym = e.target.getAttribute('data-autonym');
      alert(`You selected : ${langAutonym} as your language`);

      this.getData(userLang, pageTitle);
    }
  };

  /**
   * GetData function for fetching data and handling states
   * @param {String} lang - Language ISO code.
   * @param {String} pageTitle - Page tilte in different languages
   */
  getData = (lang = 'en', pageTitle) => {
    this.setState({ isLoading: true });
    fetchApi(lang, pageTitle)
      .then((wikipediaData) => {
        if (wikipediaData.error) {
          this.setState({
            wikiData: null,
            errorMessage: wikipediaData.error.info,
            isLoading: false,
          });
        } else {
          this.setState({
            wikiData: wikipediaData.parse.text['*'],
            langList: wikipediaData.parse.langlinks,
            defLang: lang,
            isLoading: false,
            errorMessage: null,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: `Unable to load Wikipedia results: '${error}'.`,
          isLoading: false,
        });
      });
  };

  render() {
    const { wikiData, errorMessage } = this.state;
    const htmlContent = wikiData || errorMessage;
    const userClassname = this.props.classname || '';
    return (
      <div data-test='index-container' className={`wiki-api ${userClassname}`}>
        {this.state.langList.length > 0 && (
          <DropDown
            langList={this.state.langList}
            onChanged={this.handleSelect}
          />
        )}

        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div
            data-test='resultBox'
            className='result-box'
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
            onClick={this.redirectLinks}
          />
        )}
      </div>
    );
  }
}

import React, { useState, useRef, useEffect } from 'react';
import './assets/dropdown.css';

/*
 * Component for handling dropdown open and close
 * @function - dropDownVisibleHandler
 * @param {bool} initialVisibility - initial state of dropDown
 * @return {obj} - Refrence and State
 */
const dropDownVisibleHandler = (initialVisibility) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isVisible, setIsVisible };
};

const Dropdown = (props) => {
  const [langList, setLangList] = useState([]);
  const Lang = props.langList ? props.langList : [];

  const { ref, isVisible, setIsVisible } = dropDownVisibleHandler(false);

  // If languages list is more than 10 Item then first put popular language in list
  const sortedLangs =
    Lang.length > 11
      ? Lang.filter((lang) => {
          switch (lang.lang) {
            case 'de':
              return true;
            case 'ru':
              return true;
            case 'it':
              return true;
            case 'fr':
              return true;
            case 'tr':
              return true;
            case 'ar':
              return true;
            case 'es':
              return true;
            case 'hi':
              return true;
            case 'ja':
              return true;
            case 'zh':
              return true;

            default:
              return false;
          }
        })
      : Lang;

  useEffect(() => {
    setLangList(sortedLangs);
  }, []);

  const handleVisible = () => {
    setIsVisible(!isVisible);
    setLangList(sortedLangs);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    if (e.target.getAttribute('href')) {
      setLangList(sortedLangs);
      setIsVisible(false);
      props.onChanged(e);
    }
  };
  return (
    <div data-test='dropdown-component' className='dropdown'>
      <button
        data-test='dropdown-button'
        className='dropbtn'
        onClick={handleVisible}>
        {props.title || 'Language'}
      </button>
      {isVisible && (
        <ul
          data-test='dropdown-list'
          id='myDropdown'
          className='dropdown-content'
          ref={ref}
          onClick={clickHandler}>
          <li>
            <a
              className='en'
              data-title='Albert_Einstein'
              data-autonym='English'
              data-lang='en'
              href='https://en.wikipedia.org/wiki/Albert_Einstein'>
              English
            </a>
          </li>

          {langList.length > -1
            ? langList.map((lang, index) => (
                <li key={index}>
                  <a
                    className={lang.lang}
                    data-title={lang['*']}
                    data-autonym={lang.autonym}
                    data-lang={lang.lang}
                    href={lang.url}>
                    {lang.autonym}
                  </a>
                </li>
              ))
            : null}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;

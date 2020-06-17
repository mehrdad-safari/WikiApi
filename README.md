# Intro

This is a React Component to display information from wikipedia it also supports language change.
Its written with React 16.13.1 and uses React Hooks. the component excepts the following props:

```sh
keyword
locale
classname  //Custom className for Component
```

If the keyword or locale is not set or fails then the default ones will be used as fallback:

```sh
Albert_Einstein
en
```

To increase the speed I only request content text and languages list from the Wikipedia API by adding `prop=‘text|langlinks’` to API Url.

The title of the page or its page ID in one language is different from its title or page ID in another language, and sending a same title or page ID for all language API’s causes get `Not Found` page in some languages.
To solve this problem, the list of available languages in the requested page has been saved in state and right title for each language has been used in API request.

Because I don’t like the Dropdown original style, I made a simple component to display languages and their country flags.

# Usage

to use this component in your own react app after coping it in your project first import it like :

```sh
 import  WikiApi  from  'YOUR PATH';
```

and then use component with or without Props like :

```sh
<WikiApi  keyword='Albert_Einstein'  locale='en'  classname=''  />
```

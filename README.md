# Intro

This is a React Component to display information from wikipedia it also supports language change.
Its written with React 16.13.1 and uses React Hooks.the component accepts the following props:

| Props     |   Default Value |          Description           |
| --------- | --------------: | :----------------------------: |
| keyword   | Albert_Einstein |           Page title           |
| locale    |              en |        initial language        |
| classname |           empty | Custom className for Component |

There is not any required Prop If they are not set or fails then the default ones will be used as fallback.

To increase the speed I only request content text and languages list from the Wikipedia API by adding `prop='text|langlinks'` to API Url.

The title of the page or its page ID in one language is different from its title or page ID in another language, and sending a same title or page ID for all language API’s causes get Not Found page in some languages. To solve this problem, the list of available languages in the requested page has been saved in state and right title for each language has been used in API request.

Because I don’t like the Dropdown original style, I made a simple component to display languages and their country flags.

# Demo

Demo ：<https://wikipedia-api-application.herokuapp.com/>

# Usage

to use this component in your own react app after copying it in your own project, simply import it:

```sh
import  WikiApi  from  'YOUR PATH';
```

and then use component with or without Props like :

```sh
<WikiApi  keyword='Albert_Einstein'  locale='en'  classname=''  />
```

# Test

to run test:

```sh
$npm run test
```

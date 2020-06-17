# Intro

This is a React Component to display information from wikipedia it also supports language change.
Its written with React 16.13.1 and uses React Hooks.the component accepts the following props:

| Props     |   Default Value |          Description           |
| --------- | --------------: | :----------------------------: |
| keyword   | Albert_Einstein |           Page Slug            |
| locale    |              en |        Initial language        |
| classname |           empty | Custom className for Component |

If the Props are not set the defaults will be used.

To increase the speed I only request content text and languages list from the Wikipedia API by adding `prop='text|langlinks'` to API Url.

The slug of the page is different in each language and can not be used for other languages, to solve this issue, after fetching the result from api we get the related slug for each language and save it in state, then when switching languages we simply use the state to find the right keyword in that language and feed it to API.

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

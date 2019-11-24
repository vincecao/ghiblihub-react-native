# Ghibli Hub

![](./screenshots/merge_from_ofoct.png)

## 
A React Native App for listing all films in Ghibli Studio.

## Build 
_Test for ios only_

``` bash
cd yarn install

cd ios
pod install
# prevent 'null is not an object' error

# Modify API KEY in `env.js`

npm run ios8 #run Iphone 8 Simulator
#npm run ios8p #run Iphone 8 Plus Simulator
#npm run ios11 #run Iphone 11 Simulator
```

## Update Log
_11/24/2019_
- init project, with basic home, and detail pages
- Integate with [omdbapi](www.omdbapi.com) & [ghibliapi](https://ghibliapi.herokuapp.com/)

## License
MIT @ Vince Cao
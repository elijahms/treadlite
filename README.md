# Treadlite - Carbon Footprint Tracker

Treadlite aims to bring awareness to peoples' carbon footprint, using a complex and comprehensive scoring method.

Check it out: [@Treadlite](https://treadlite.herokuapp.com/)
(please allow the heroku server a few seconds to 'warm up')

## Introduction

Treadlite was created as a personal project while attending Flatiron SE bootcamp. It was the final project of the course and aimed to showcase my skills as a fullstack developer. It utilizes React on the front-end, and Ruby on the back-end. I chose to make a carbon-footprint calculator because reducing our collective carbon-footprint is something i'm passionate about.

## Technologies

Project is created with:

- React.js version 17.0.2
- Ruby version 2.7.4
- Rails version 7.0.0
- bcrypt (for secure login/singup)
- MUI - (for styling)
- Heroku
- React Spring version 9.4.2 (for cool animations!)

## Features

- Secure login and signup
- Viewing other users, following/unfollowing other users.
- Weekly 'trend' update that is limited to be updated once per 7 day period
- Comprehensive account page where the score is calculated based on the user's inputs.
- Dashboard page to view your stats.

## Known Issues

- On Safari for desktop the landing page is extremely janky. Unkown reason.
- Not posting to heroku

## Setup

To run this project, install it locally using npm:

```
$ cd ../treadlite
$ npm start --prefix client
$ rails s

```

## Contact

Created by [@elijahsilverman](https://elijahsilverman.com) - feel free to contact me!

## Credit

- [@George Evans](https://unsplash.com/@george_evans) for the cover image via Unsplash
- MUI - thank you for the incredivle team behind this project! This was an invaluable resource
- Heroku - thank you for a warm and cozy place to host the site!
- [@Leizl Samano](https://betterprogramming.pub/how-to-create-a-follow-feature-in-rails-by-aliasing-associations-30d63edee284) for a great blog post on creating a 'following/follower' model
- [@junjun](https://codepen.io/postor/pen/mskxI) for the awesome homepage scroll arrows

## Data Sources

More details and links can be found in the source code under App>Models>Userrecord.rb

- EPA
- Statista
- EIA
- FHWA (DOT)
- Quantis
- The Zebra
- Green Zero Carbon Home
- BLS
- Biofuel Digest
- Science Direct
- Shrink that Footprint

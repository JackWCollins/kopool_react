# Welcome to the KO Pool!

I originally started this project years ago for a family friend. He hosts a "knockout pool" each year during the NFL Season.

The game is simple: each week of the NFL season you must pick one team that will win. If that team wins then you advance to the next week. If that team loses or ties then you're knocked out!

Although the game is simple, there are some fun pieces of the code. The "commish" or manager of the pool has admin rights to score each matchup and control when picks are locked. Participants can only see the picks for each week starting at 11 AM on Sunday morning. It makes for some exciting games to watch on Sunday!

This new project is built with:

* Rails 5.2
* `react_on_rails` gem using webpacker
* React.js with React Router V4
* `jwt` gem for Javascript Web Token authorization
* Apollo and GraphQL

This project is still definitely a work in progress. The [original version](https://github.com/JackWCollins/kopool) was written in Rails 4 and Angular JS 1.5. I haven't updated that code in years, so if you venture in there shield your eyes! 

![First Week Sample Image](./public/kopool_sample_desktop.png)
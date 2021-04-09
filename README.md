<img width="100%" src="https://github.com/Jappan07/LLAM/blob/master/public/Assets/Screenshot%20from%202021-04-06%2001-27-30.png" />
<p align="center">
<img width="300px" src="public/assetss/llamlogo.png" />
</p>

Project: L.L.A.M - Locust Location & Apprehension Module
=======================

> "Save crops from locust attacks"

**Web App**: https://locustlocator.vercel.app 🔗

**Live Demo**: https://youtu.be/C1QmCuzrBw8 🔗
## What does this project do? 🤔

LLAM tracks the realtime locusts location and visualizes wind patterns on earth.
Predicts the probability of locust attacks on a particular given position through satellite imagery using machine learning models.

## Who did we design this project for? 👨🏻‍🌾

This project is designed keeping the problems that farmers face due to locusts in mind. We aim to reduce the destruction of crops caused by locusts which leads to massive effect on socio-economic interests of farmers.

## What was the inspiration for this project? 💡

The inspiration behind L.L.A.M was that locusts are increasingly becoming a great threat to the vegetation and this threat is reportedly going to increase each year. To safeguard crops and farmers from this plague we needed some solution that could tackle the problem well.


## What challenges did we run into? 🤯

- The first challenge we ran into was how will we collect the relevant data.
- Then we had to decide how will we visualize the frontend with that data.
- Changing code to fit our Next js frontend framework.
- Populate data with efficiency because alot of gpu power was required.
- Rendering terrains and maps in Cesium Js.

## What accomplishments are we most proud of? 👏

- Visualizing the data on 3d earth.
- Rendering the satellites on earth from which the data is retrieved.
- ML model predictions from satellite imagery.
- Team did phenomenal job at helping each other and integrating stuff together. 

## What we learned ? 🧠

- Using Microsoft Azure services for creating sick APIs.
- Cesium Js framework to render and perform functions on 3D earth.
- Amazing Next Js features.

## What's next for L.L.A.M 🚀

- More optimization have to be made.
- Improve accuracy
- Add layer to predict locust movement using wind data


## More about the project 🔥

**Web App**: <a target="_blank" href="https://locustlocator.vercel.app">https://locustlocator.vercel.app 🔗</a>

**Live Demo**:  <a target="_blank" href="https://youtu.be/C1QmCuzrBw8">https://youtu.be/C1QmCuzrBw8 🔗</a>

<h4 align="center">Tracking feature</h4>

![](public/assetss/1.png)

<h4 align="center">Wind patterms and locusts visualized</h4>

![](public/assetss/3.png)

<h4 align="center">Zoomed in view of location where potential locust is found</h4>

![](public/assetss/4.png)

<h4 align="center">Predicting locust attack on a particular location</h4>

![](public/assetss/2.png)

<h4 align="center">Satellites visualized through which data is retrieved</h4>

![](public/assetss/5.png)

<a target="_blank" href="https://drive.google.com/file/d/1g6OHy5ZD4szA-MYwIqhsx4ThTgVz9s6F/view?usp=sharing"><h4 align="center">ML Pipeline 🔗</h4></a>

<a target="_blank" href="https://drive.google.com/file/d/1g6OHy5ZD4szA-MYwIqhsx4ThTgVz9s6F/view?usp=sharing">
<img src="public/assetss/ml-model.png" /></a>



Prerequisites
-------------

- [NextJS](https://nextjs.org)
- [Node.js 10+](http://nodejs.org)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
 - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp;**Windows:** [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs) OR [Visual Studio Code](https://code.visualstudio.com) + [Windows Subsystem for Linux - Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
 - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp;**Ubuntu** / <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png" height="17">&nbsp;**Linux Mint:** `sudo apt-get install build-essential`
 - <img src="http://i1-news.softpedia-static.com/images/extra/LINUX/small/slw218news1.png" height="17">&nbsp;**Fedora**: `sudo dnf groupinstall "Development Tools"`


Getting Started 🎬
---------------

The easiest way to get started is to clone the repository:

```bash
# Cloning the repo
git clone https://github.com/Jappan07/LLAM

# Change directory
cd LLAM

# Install NPM dependencies
npm install

# Then simply start your app
npm run dev
```


```bash
# project will start at localhost:3000
visit https://localhost:3000 on any browser.
```

**Note:** GPU intensive features are added into this project so it is suggested to run this application on a machine having dedicated gpu so that it could run smoothly. 


License
-------

The MIT License (MIT)

Copyright (c) 2021-3010 Hacker House <img width="20px" src="public/assetss/HackerHouse.png" /> 

# The GLEO Project

The Gleo Project is a groundbreaking social media platform designed to inspire and reward community engagement. Users participate in civic activities, volunteering, and more, earning points redeemable for discounts, free services, and merchandise from partner companies. This innovative platform fosters community connections while incentivizing positive contributions to society, creating a more engaged and socially conscious world.


## Installation

Ensure you have installed Node.js and npm \
Mac: `brew install node` \
Windows: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm \
Ensure you have installed docker \
Clone the github repository

### Frontend Start
#### Navigate to the frontend folder, then use the following commands:
Mac IOS:
```
cd ./ios/
pod install
cd ..
npm start ios
```
Windows Android:
```
*** WIP ***
```

### Backend Start
#### Navigate to the backend folder, then use the following commands (must be done before starting frontend):
Mac IOS:
```
docker-compose up //ensure you have docker running
```
Windows:
```
npm i express
npm i --save-dev nodemon
```
#### Running the backend (Do this every time)
Mac IOS:
```
npx nodemon api.ts
```
Windows:
```
npm run devStart
```
If you have Visual Studio Code with the REST client package, you should now be able to use any of the GET and POST commands seen in requests.rest


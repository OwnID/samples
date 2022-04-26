# OwnID Samples
A repository containing samples projects of integrating OwnID into your website
<br/>
<br/>
![](https://console.ownid.com/assets/integrations-icons/Firebase-40x40.svg)
![](https://console.ownid.com/assets/integrations-icons/SAP-40x40.svg)
![](https://console.ownid.com/assets/integrations-icons/Node-40x40.svg)
![](https://console.ownid.com/assets/integrations-icons/Csharp-40x40.svg)
![](https://console.ownid.com/assets/integrations-icons/Python-40x40.svg)
![](https://console.ownid.com/assets/integrations-icons/JAVA-40x40.svg)
## Table of Contents
* [What is OwnID](#what-is-ownid)
* [Installation](#installation)
* [Getting Started](#getting-started)

## What is OwnID?
OwnID offers a passwordless login alternative to a website by using cryptographic keys to replace the traditional password. The public part of a key is stored in the website's identity platform while the private part is stored on the mobile device. With OwnID, the user’s phone becomes their method of login.
When a user registers for an account on their phone, selecting Skip Password is all that is needed to store the private key on the phone. As a result, as long as they are logging in on their phone, selecting Skip Password logs the user into the site automatically. If the user accesses the website on a desktop, they register and log in by using their mobile device to scan a QR code. Enhanced security is available by incorporating biometrics or other multi-factor authentication methods into the registration and login process. icensed under the Apache License 2.0. See the LICENSE file for more information.
## Installation
When setting up front-end project 
<br/>
Use the npm CLI to run:
```bash
npm i && npm start
```
If the project has back-end project (Full Stack integration)<br/>
Make sure to run the "Backend" project using your favorite IDE on a desire CLI</br>

## Getting Started
* [Front-end Project Structure](#Front-end-Project-Structure)
* [Back-end Project Structure](#Back-end-Project-Structure)
### Front-end Project Structure
Each project containing 3 page
<pre>
└── pages
    ├── login/index
    ├── register
    └── account
</pre>

### Back-end Project Structure
Each project containing a controller that exposes several function
<pre>
└── userController
    ├── login
    ├── register
    ├── getOwnIDDataByLoginId
    ├── getSessionByLoginId
    └── setOwnIDDataByLoginId
</pre>

## For further information
[Read our docs](https://docs.ownid.com/)
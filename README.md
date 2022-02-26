# TNJSMC-follow-app

The Node.js Master Class Follow App

## Building A Restful API: ADDING HTTPS SUPPORT 
#### How to Generate ssl certificate

1. Create a https folder and cd into it
```
mkdir https
cd https
```

2. enter in your terminal the below command to generate a key and cert pem using openssl
```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

3. you'll then get a series of prompts, please see below sample response of the above command:

> *Generating a 2048 bit RSA private key*  
> \..................+++
> \.....................................................+++  
> *writing new private key to 'key.pem'*
> \-----
> *You are about to be asked to enter information that will be incorporated*  
> *into your certificate request.*  
> *What you are about to enter is what is called a Distinguished Name or a DN*   
> *There are quite a few fields but you can leave some blank*  
> *For some fields there will be a default value,*  
> *If you enter '.', the field will be left blank.*  
> \-----  
> *Country Name (2 letter code) []: \<enter country name\>*  
> *State or Province Name (full name) []:\<enter state\>*  
> *Locality Name (eg, city) []:\<enter city name\>*  
> *Organization Name (eg, company) []:\<enter company name\>*  
> *Organizational Unit Name (eg, section) []:\<enter org unit name\>*  
> *Common Name (eg, fully qualified host name) []:\<enter common name\>*  
> *Email Address []:<enter dummy email address>*  

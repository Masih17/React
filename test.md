
# Oppppi4: Study the security of the Ubuntu 20.04 server


This is for those who are interested in learning a bit more of the Linux OS, DevOps, the command line, the file system and security models. 


#### 1. Set up public key – private key pair authentication for developers = students
SSH key creation (on local machine) and copying the public key to remote host for a single user (this case oppppi4)
[Source 1 for ssh key creation](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04 "Google's Homepage")
[Source 2 for ssh key creation](https://linuxize.com/post/how-to-set-up-ssh-keys-on-ubuntu-20-04/ "Google's Homepage")

// *server IP: 86.50.253.117*

// *server username: oppppi4*

// *remote_hostname@remote_server_ip: ''oppppi4@86.50.253.117''*

Starting by creating 4096 bit `RSA` public/private key-pair fn:firstname, ln:lastname to add email as comment to the key-pair 
``ssh-keygen -t rsa -b 4096 -C 'fn.ln@myy.haaga-helia.fi'``

#### 2. Read the tail of the security logs. 
#### 3. Run commands that e.g. tell what ports the processes are listening to. 
#### 4. Run commands e.g. finding out what are all the processes running for the MariaDB database / create-React-app front dev env  / Node backend server.
#### 5. How to create ssh tunnels from command line. 
#### 6. Other command line commands.


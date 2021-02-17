
# Oppppi4: Study the security of the Ubuntu 20.04 server
---

This is for those who are interested in learning a bit more of the Linux OS, DevOps, the command line, the file system and security models. 


#### 1. Set up public key – private key pair authentication for developers = students
SSH key creation (on local machine) and copying the public key to remote host for a single user (this case oppppi4)

[Source 1 for ssh key creation](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04 "Google's Homepage")

[Source 2 for ssh key creation](https://linuxize.com/post/how-to-set-up-ssh-keys-on-ubuntu-20-04/ "Google's Homepage")

// *server IP: 86.50.253.117*

// *server username: oppppi4*

// *remote_hostname@remote_server_ip:* `oppppi4@86.50.253.117`

Starting by creating 4096 bit `RSA` public/private key-pair fn:firstname, ln:lastname to add email as comment to the key-pair 

	ssh-keygen -t rsa -b 4096 -C 'fn.ln@myy.haaga-helia.fi'

// press enter to confirm where the key will be saved (default directory)

// create and re-type passphrase

// create own passphrase

// type own passphrase

Verify key creation was successful, command below will print the filename if successful

	ls ~/.ssh/id_*

next copy the public key to server (`.ssh/authorized_keys`)

// model command: ssh-copy-id remote_username@server_ip_address

	ssh-copy-id oppppi4@86.50.253.117

Test connection - ssh remote_username@server_ip_address 

	ssh oppppi4@86.50.253.117

// after these steps you can log onto the machine via SSH


**IF password authentication should be disabled**

*disable SSH password authentication need **sudo** privileges*

	sudo nano /etc/ssh/sshd_config

// in a file /etc/ssh/sshd_config ->
change:

	PasswordAuthentication “no”

	ChallengeResponseAuthentication ”no”

	UsePAM “no”

Restart the ssh-service with sudo-priviledges

	sudo systemctl restart ssh

#### 2. Read the tail of the security logs. 
Linux log files are located in **/var/log** directory. The authentication logs are stored in **auth.log** file. A sudo-privileged user can view the content of the file. To see a part of the log file, tail or head command can be used. Tail displays the end of the file or head the beginning of the file. 

Example below prints 10 last lines of the file by default.

	tail /var/log/auth.log 

To see the last 30 lines of the file.

	tail -30 /var/log/auth.log

To narrow the search to a more specific format `grep, sed, awk`, can be used. For example, to search the last 50 lines of **auth.log** file for any failed attempts we can run:

	tail -50 /var/log/auth.log | grep -i "fail"
	
To search for multiple patterns we can use the command below:

    grep -i "PATTERN1" PATH/TO/FILE | grep -i "PATTERN2"
    
The ` -i ` option makes the pattern case insensitive.  
    
Command bellow finds all ssh activities on February 14. 

    grep -i 'feb 14' /var/log/auth.log | grep 'ssh'

To search the whole log file, instead of tail commands such as `cat, less` or `more` can be used.

### 3. Run commands that e.g. tell what ports the processes are listening to. 
To investigate sockets in Linux, `ss` command is can be used. Most common options used with ss command are as follows: 

- `-l`, to display only the listening sockets

- `-p`, shows the process using the socket

- `-t`, display TCP sockets.

- `-u`, display UDP sockets.

- `-n`, prevents resolving the service name and show exact bandwidth values, instead of human-readable.


<!-- end of the list -->

The command below lists the TCP, UDP sockets in numerical format. If the `-n` is omitted, instead of port number, the name of the service is printed. 

	ss -tulnp 

Again, we can filter the results like this: 

	ss -tulnp | grep -i listen
 
 Another command that is used to show open ports is `lsof` (list open files). Again, there are options that should be used to narrow the search scope. 
- `-i`, selects the listing of files any of whose Internet address matches the address specified in `i`. If no address is specified, this option selects the listing of all Internet and x.25 (HP-UX) network files.

- `-P`, Do not resolve hostnames, show numerical addresses.

- `-n`, Do not convert port numbers to port names.

<!-- end of the list -->
	
	sudo lsof -i -n -P | grep -i listen

Older ways to retrieve the result above was using net-tools and netstat command. These are deprecated but can be installed and used like this: 

	sudo apt install net-tools

	sudo netstat –tunlp

### 4. Run commands e.g. finding out what are all the processes running for the MariaDB database / create-React-app front dev env  / Node backend server.

`pgrep` command looks through the currently running processes and lists the process IDs which match the selection criteria. By adding `-a` option we can list PID and full command line.

`pgrep -a mariadb`

Another common way to see a report of the running process is `ps` command. The useful options are as follows:

- `-a` select all processes except both session leaders and processes not associated with a terminal.

- `-u`, Select by effective user ID (EUID) or name.  This selects the processes who’s effective user name or ID is in user list.

- `-x` here is the name of user which.

<!-- end of the list -->

	ps –aux

	ps -aux | grep mariadb

Tree representation of process related to node.

	ps -f –forest -C node

### 5. How to create ssh tunnels from command line. 

SSH – Tunneling

	apt-get update

	apt insall openssh-server

Server ip   -->  `ip a | grep inet`

Service status

	systemctl status ssh

Forwarding with ssh

	ssh -L freePort:serverIP:port user@sshserver	(`-L` for local host)

### 6. Other command line commands.
Basic commands

`pwd`: current working directory

`ls`:  lists the content of the directory

`file`: this shows what kind of file is it

`cat`: It prints out content of the file

`cd`: It change directory

`clear`: It clears the screen

`history`: It shows history of all the commands as it were entered

`cp`: It copies a file/directory	

`mv`: it moves files to a new location, also can rename it

`rm`: it is used to delete files




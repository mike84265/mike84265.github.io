---
layout: post
title: Radius & Log Server for Mid-scale Shared Network Administration
affiliation: NTU PA Team
summary: A self-hosted radius server to enable WPA2-Enterprise Wi-Fi for enhanced security and ease of management
thumbnail: /assets/img/NTU-Logo.png
top_figure: /side_projects/WPA2_enterprise_meme.jpg
keywords: Radius, WPA2-Enterprise
usemathjax: true
visible: true
category: side_projects
period: Sep '17 - Jul '18
date: 2018-07-31
publish: true
permalink: /side_projects/radius_server.html
---

- toc 
{:toc}

# Background
Per the network administration policy at NTU, a student club is often assigned with a mere fixed public IP.
And it is often the case that a club has one or more APs to share the network wirelessly.
However, the scarce public IP, or in general, the whole network in NTU, is administrated by TANet (Taiwan Academic Network), and is prohibited against malicious actions. 
Any suspicious action patterns resembling zombie, mining, DoS, and so on will cause this IP to be banned due to security concerns.
To lift the ban, the administrator of the banned IP must submit a report promising that the root cause has been found and resolved.
However, it takes an extensive framework to pinpoint the root cause of a security issue because there are so many users sharing this network, and even more devices because many people have multiple devices to use Wi-Fi nowadays.
Furthermore, the club has many devices that can be operated over LAN.
For example, the digital mixer and lighting console are accessible over Wi-Fi.
As a result, there was an urgent need to upgrade the network infrastructure of this club, to ensure that network administrator can always pinpoint the root cause of a ban, and to ensure the network can only be accessed by authorized persons.

# Introduction
## Personal Network
The mostly-used protocal WPA2/WPA3-Personal, or in short, personal network, only requires a *password* to access.
Anyone knowing the password can access the Wi-Fi without permission from the administrator,
which is to say, even a passerby knowing the password can access this fragile network.
What's worse, there is only one password in service at anytime.
Hence, if the administrator decides to change the password, he/she must notify all members to comply with the new password.

## Enterprise Network
The enterprise network requires a pair of *account* and *password* to log in.
Several account can co-exist simultaneously, and users' identity is marked by their login account during logging in.
The administrator can add or remove an account at any time to enable or disable the access of a certain user.
Besides, the access control list (ACL) is synchronized over multiple APs.
Therefore, the administrator only needs to add/remove the involved accounts once to enable/disable the access over multiple APs.

Enterprise-grade network is actually broadly supported in even consumer-grade APs.
However, it requires another standalone *radius server* to store the accounts.
Therefore, one of the major contributions of this project is to <u>build a radius server to enable enterprise-grade Wi-Fi</u>.
Consequently, all the logging record, including user name and the MAC address of the devices, are stored for future investigation if needed.

![radius_log](/assets/img/radius_log.png){:class="card-img"}
*Log records of the radius server. Useful information includes timestamp, username, device MAC, and accessed SSID.*

# Architecture
I made a ppt to introduce the whole framework from hardware and software perspectives to the upcoming members.

<div id="adobe-dc-view" class="embed-slides"></div>
<script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
<script>
const fileUrl = "/files/NTUPA_IT_handover.pdf";
const fileName = "NTUPA_IT_handover.pdf";
</script>
<script src="/assets/js/embed_pdf.js"></script>

## Windows (Host OS)
### DrayTek log software
This software is only offered in Windows version. Therefore the server's host OS is installed as Windows.
### TeamViewer
TeamViewer offers remote control through WAN or LAN. This software is used as a shorthand for peripheral devices so that there is no need to maintain a keyboard and mouse for this machine.

## CentOS (Virtual Machine)
### Radius server
[`freeradius 3.0`](https://github.com/FreeRADIUS/freeradius-server) is adopted.

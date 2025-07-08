---
title: "[CCNA Lab] VLAN Configuration and Troubleshooting"
date: 2025-07-01
tags: ["CCNA", "Packet Tracer", "VLAN", "network"]
description: "A study log covering VLAN setup and trunk configuration using Cisco Packet Tracer, with images and detailed explanations"
---

<style>

.lab-container h1,
.lab-container h2 {
  text-align: left;
}

.lab-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px 80px;
  font-size: 1.3rem;
  text-align: center;
}
.lab-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.topology-img {
  max-width: 80%;
  height: auto;
  margin: 20px auto;
}
.topology-steps {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  font-size: 1.3rem;
  line-height: 1.6;
}
@media screen and (max-width: 600px) {
  .lab-title {
    font-size: 1.5rem;
  }
  .topology-steps {
    font-size: 0.95rem;
  }
}
</style>

<div class="lab-container">

<div class="lab-title">VLAN Configuration & Trunk Setup Lab</div>

Hi there!  
In this lab, I used **Cisco Packet Tracer** to configure VLANs and trunk ports.  
Here’s the network setup and a step-by-step guide.

---

## 1, Network Topology

<img src="/vlan-topology.png" alt="VLAN Topology Diagram" class="topology-img" />

<div class="topology-steps">
<ol>
  <li>Configure the switch interfaces connected to PCs as access ports assigned to the correct VLANs.</li>
  <li>Configure the trunk link between SW1 and SW2, allowing only necessary VLANs.<br>
      Use an unused VLAN as the native VLAN.<br>
      <strong>Ensure all required VLANs exist on both switches.</strong></li>
  <li>Set up the connection between SW2 and R1 using "Router on a Stick".<br>
      Assign the last usable IP address in each subnet to the router's subinterface.</li>
</ol>
</div>
<br><br>

---

##  2, How to Configure the Switches

<div class="topology-steps">
<ol>
  <li>Create VLANs on each switch using <code>vlan [ID]</code> in global config mode.</li>
  <li>Assign access ports to VLANs:<br>
      <code>switchport mode access</code><br>
      <code>switchport access vlan [ID]</code></li>
  <li>Configure trunk ports:<br>
      <code>switchport mode trunk</code><br>
      <code>switchport trunk allowed vlan [ID,ID,...]</code></li>
  <li>Set a native VLAN (must be unused):<br>
      <code>switchport trunk native vlan [ID]</code></li>
  <li>Configure subinterfaces on the router:<br>
    <pre>
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.254 255.255.255.0
    </pre>
  </li>
</ol>
</div>

---
<br><br>

##  3, Ping Test

<div class="topology-steps">
<p>Let’s try pinging each PC to verify communication.</p>
</div>

<img src="/Fail ping.png" alt="Ping Failure Screenshot" class="topology-img" />

<div class="topology-steps">
Ping to 10.0.0.65 (PC5) was successful, but 10.0.0.2 (PC2) failed.  
This suggests a problem in the trunk link. Let’s inspect the switch config.
</div>

<img src="/SW2 trouble.png" alt="SW2 Config Error" class="topology-img" />

<div class="topology-steps">
Oops! A syntax mistake: I used a period (`.`) instead of a comma (`,`) when listing allowed VLANs.  
That caused the trunk to block necessary VLANs.  
Always double-check your syntax!
</div>

<img src="/Revise.png" alt="Revised Config" class="topology-img" />

<div class="topology-steps">
I fixed the trunk config. Time to test again!
</div>

<img src="/perfect.png" alt="Successful Ping" class="topology-img" />

<div class="topology-steps">
Success! I received replies from PC2 and PC3.  
Inter-VLAN routing is now working properly!
</div>

<img src="/sumi.png" alt="Simulation Mode Screenshot" class="topology-img" />

<div class="topology-steps">
Finally, I used simulation mode to trace the packets visually.  
🎉 <br>
That’s all for this VLAN & trunking lab!
</div>

</div>

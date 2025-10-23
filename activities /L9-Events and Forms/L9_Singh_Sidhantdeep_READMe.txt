Dalhousie University – CSCI 3172
Lecture 9 Activity: Focus and Blur Event Handling
Student: Sidhantdeep Singh
Date: October 2025

-----------------------------------
Project Description
-----------------------------------
This activity demonstrates handling DOM events in JavaScript.  
The page includes input fields for First Name, Last Name, and Email.

Each input listens for 'focus' and 'blur' events:
 • When focused, the input background changes colour (via an .active CSS class).
 • When focus is lost (blur event), the background returns to default.

A loop attaches these listeners to all inputs, fulfilling the requirement to use
control structures and DOM traversal creatively.

-----------------------------------
File List
-----------------------------------
index.html   – Main page layout and form structure  
style.css    – Styling rules for inputs (including the .active class for focus)  
script.js    – JavaScript logic for focus/blur events and optional form handling  
README.txt   – This project overview file

-----------------------------------
How to Run
-----------------------------------
1. Visit the page in your browser at:
   https://web.cs.dal.ca/~sidhantdee/csci3172/activities/lecture9/

2. Click inside the First Name, Last Name, or Email fields.  
   → The background colour will change on focus.  
   → When you click away (blur), it returns to normal.

-----------------------------------
Learning Outcomes
-----------------------------------
• Understand and implement JavaScript event listeners  
• Use loops to attach multiple handlers efficiently  
• Manipulate the DOM through class addition and removal  
• Integrate CSS transitions with event-driven JavaScript

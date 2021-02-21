import smtplib
import os
from email.message import EmailMessage
import imghdr

msg = EmailMessage()
msg['Subject'] = 'Subject from Python'
msg['From'] = 'aryanjn09@gmail.com'
msg['To'] = 'aryanjn09@gmail.com'

msg.add_alternative("""\
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attentive Teacher Report</title>
</head>
<body>

    <style>

        * {
            padding: 0;
            margin: 0;
        }

        ul {
            list-style: none;
        }

        .name-list .person {
            border: 1px solid black;
        }

        .name-list li:hover{
            cursor: pointer;
        }

        .name-list ul {
            background: #ddd;
            height: 0;
            opacity: 0;
            position: absolute;
            transition: all .5s ease;
            width: 100%;
        }

        .active ul {
            height: 100px;
            opacity: 1;
            transform: translateY(0);
        }
        
        .name-list ul li {
            color: #000;
            display: block;
        }

    </style>

    <h1>Hi Teacher Name!</h1>

    <ul class="name-list">
        <li onclick="drop('name')" id="name" class="person">
            <h2 class="name">Name</h2>
            <ul class="person-info">
                <li class="info">Info</li>
                <li class="info">Info</li>
                <li class="info">Info</li>
            </ul>
        </li>
    </ul>


    <script>
        function drop(id) {
            var ob = document.getElementById(id);
            ob.classList.toggle("active");
            // alert(o.innerHTML);
        }
    </script>



    
</body>
</html>
""", subtype='html')



with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
    smtp.login('aryanjn09@gmail.com', 'Aryan321!')
    smtp.send_message(msg)
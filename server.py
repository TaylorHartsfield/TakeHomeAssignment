from flask import Flask, jsonify, request, session
from datetime import time
import json
import model
import crud

app = Flask(__name__)
app.secret_key='dev'


time_formats = {
'00:00:00' : '12:00 AM',
'00:30:00' : '12:30 AM',
'01:00:00' : '1:00 AM',
'01:30:00' : '1:30 AM',
'02:00:00' : '2:00 AM',
'02:30:00' : '2:30 AM',
'03:00:00' : '3:00 AM',
"03:30:00" : '3:30 AM',
"04:00:00" : '4:00 AM',
"04:30:00" : '4:30 AM',
"05:00:00" : '5:00 AM',
"05:30:00" : '5:30 AM',
"06:00:00" : '6:00 AM',
"06:30:00" : '6:30 AM',
"07:00:00" : '7:00 AM',
"07:30:00" : '7:30 AM',
"08:00:00" : '8:00 AM',
"08:30:00" : '8:30 AM',
"09:00:00" : '9:00 AM',
"09:30:00" : '9:30 AM',
"10:00:00" : '10:00 AM',
"10:30:00" : '10:30 AM',
"11:00:00" : '11:00 AM',
"11:30:00" : '11:30 AM',
"12:00:00" : '12:00 PM',
"12:30:00" : '12:30 PM',
"13:00:00" : '1:00 PM',
"13:30:00" : '1:30 PM',
"14:00:00" : '2:00 PM',
"14:30:00" : '2:30 PM',
"15:00:00" : '3:00 PM',
"15:30:00": '3:30 PM',
"16:00:00" : '4:00 PM',
"16:30:00" : '4:30 PM',
"17:00:00" : '5:00 PM',
"17:30:00" : '5:30 PM',
"18:00:00" : '6:00 PM',
"18:30:00" : '6:30 PM',
"19:00:00" :'7:00 PM',
"19:30:00": '7:30 PM',
"20:00:00" : '8:00 PM',
"20:30:00": '8:30 PM',
"21:00:00" : '9:00 PM',
"21:30:00" : '9:30 PM',
"22:00:00" : '10:00 PM',
"22:30:00" : '10:30 PM',
"23:00:00" : '11:00 PM',
"23:30:00" : '11:30 PM'
}

@app.route('/login/<username>', methods=["POST"])
def login(username):

    user = crud.user_login(username)

    if user:
        session['user'] = username
        appointments = crud.user_appointments(username)
        return jsonify({"user": user.username,
                        "appointments": appointments})
    else:
        return jsonify({"message": "Username does not exist. Register or try again."})
    

@app.route('/api/register',  methods=["POST"])
def register():
    
    username = request.json.get('username')['username']
    new_user = crud.create_user(username)

    if not new_user:
        return jsonify({"error": "An error occured. Please try again."})
    session['user'] = username
    return jsonify({'user': new_user.username})


@app.route('/api/book', methods=["POST"])
def book(): 

    username = session['user']
    date = request.json.get('date')
    time = request.json.get('time')

    book = crud.book_appoointment(date,time,username)

    better_date_format = book.date.strftime("%B %d, %Y")
    better_time_format = time_formats[book.time.isoformat()]
    return jsonify({
                "message": 
                    f"You have booked your appointments for {better_date_format} at {better_time_format}"})

@app.route('/api/available/<date>')
def all_appointments(date):
    
    taken = crud.get_times(date)

    times = []

    if not taken:

        for i in range(24):
            hour = time(i,0)
            half = time(i,30)
            times.append(hour)
            times.append(half)
    else:
        for available in taken:
            times.append(time_formats[available.isoformat()])

    return jsonify({"available": times})



if __name__ == "__main__":
    model.connect_to_app(app)
    app.run(debug=True)

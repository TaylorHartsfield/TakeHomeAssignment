from flask import Flask, jsonify, request, session
from datetime import time
import json
import model
import crud

app = Flask(__name__)
app.secret_key='dev'

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


@app.route('/book/<date>', methods=["POST"])
def book(date):
    
    username = session['user']
    book = crud.book_date(date,username)
    print(book.date)
    return jsonify({"appointment": book.date})

@app.route('/api/available/<date>')
def all_appointments(date):

    new_date = f"{date[0:4]}/{date[4:6]}/{date[6:7]}"
    taken = crud.get_times(date)
    times = []
    if not taken:

        for i in range(24):
            hour = time(i,0)
            half = time(i,30)
            times.append(hour)
            times.append(half)

        return jsonify({"available": times})



if __name__ == "__main__":
    model.connect_to_app(app)
    app.run(debug=True)

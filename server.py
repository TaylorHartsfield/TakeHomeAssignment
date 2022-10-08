from flask import Flask, jsonify
import model

app = Flask(__name__)

@app.route('/members')
def available():

    return jsonify({"members" : ["message1", "message2", "message3"]})

if __name__ == "__main__":
    model.connect_to_app(app, "melonAppointments")
    app.run(debug=True, host="0.0.0.0")

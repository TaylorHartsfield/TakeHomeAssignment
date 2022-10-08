from flask import Flask, render_template
import model

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    model.connect_to_app(app, "melonAppointments")
    app.run(debug=True)

